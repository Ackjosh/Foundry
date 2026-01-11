import os
import fitz
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()
CHROMA_PERSIST_DIR = os.path.join('parent_chroma_db')
COLLECTION_NAME = "startup_parent_child_rag"

embedding_function = SentenceTransformerEmbeddings(model_name="BAAI/bge-small-en-v1.5")

vector_store = Chroma(
    persist_directory=CHROMA_PERSIST_DIR,
    embedding_function=embedding_function,
    collection_name=COLLECTION_NAME
)

retriever = vector_store.as_retriever(search_kwargs={"k": 3})

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.0
)

RAG_PROMPT_TEMPLATE = """
You are an expert startup advisor named StratoGuide. Your role is to provide actionable, insightful advice.
Synthesize your answer using **ONLY** the provided context and case studies. 
Do not use prior knowledge. Be concise and conversational.

INSTRUCTIONS:
1. Identify the most relevant case study from the CONTEXT that addresses 'low revenue' or 'early stage decisions'.
2. Explain the problem, the decision made, and the outcome.

CONTEXT:
{context}

USER QUESTION:
{input}

Actionable Advice:
"""

rag_prompt = PromptTemplate.from_template(RAG_PROMPT_TEMPLATE)

rag_chain = (
    {"context": retriever, "input": RunnablePassthrough()}
    | rag_prompt
    | llm
    | StrOutputParser()
)

user_query = "I'm worried about my startup's low revenue and need a quick fix. What early stage decision saved a successful company from failure?"

print(f"\n--- Running StratoGuide RAG Chain ---")
print(f"Query: {user_query}")
print("-" * 50)

response = rag_chain.invoke(user_query)

print("Generated Answer:")
print(response)

print("-" * 50)
