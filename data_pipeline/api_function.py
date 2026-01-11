import os
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from google.api_core.exceptions import ResourceExhausted
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()
CHROMA_PERSIST_DIR = os.path.join('parent_chroma_db')
COLLECTION_NAME = "startup_parent_child_rag"

RAG_PROMPT_TEMPLATE = """
You are an expert startup advisor named StratoGuide.

INSTRUCTIONS:
- Be concise, practical, and conversational.
- NEVER speak in the first person.
- Do NOT imply personal experience (e.g., "when I was at my startup").
- Attribute all experiences to real startups or founders from the CONTEXT.
- Do NOT assume the user's problem if it is not explicitly stated.
- If the user mentions a problem area (e.g. growth, funding, resources, scaling), provide practical guidance immediately using relevant examples. Only ask a clarifying question if giving advice would be misleading without it. Never ask more than one follow-up question.
- Do NOT use phrases like "The related case study is" or "It looks like you are facing".
- NEVER mention internal labels, numbering, sections, or document structure from the context.
- Use examples from the CONTEXT only when they clearly help answer the user's question.
- When using examples, describe the actions taken, the decision made, and the outcome — naturally.
- Do NOT over-explain or lecture.

FORMAT RULES:
- Keep the response under 6-7 short lines unless the user explicitly asks for detail.
- Use short paragraphs for readability.
- Avoid generic motivational language.

CONTEXT:
{context}

USER QUESTION:
{input}

RESPONSE:
"""
rag_prompt = PromptTemplate.from_template(RAG_PROMPT_TEMPLATE)

embedding_function = SentenceTransformerEmbeddings(model_name="BAAI/bge-small-en-v1.5")

try:
    vector_store = Chroma(
        persist_directory=CHROMA_PERSIST_DIR,
        embedding_function=embedding_function,
        collection_name=COLLECTION_NAME
    )
except Exception as e:
    print(f"Error loading ChromaDB: {e}. Ensure 03_parent_retriever.py was run.")
    raise e

llm = ChatGoogleGenerativeAI(
    model="gemini-1.0-pro",
    temperature=0.0,
    max_retries=1
)

fallback_llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0.0,
)

retriever = vector_store.as_retriever(search_kwargs={"k": 5})
_cache = {}

def get_strato_guide_answer(user_query: str) -> str:
    gemini_chain = (
        {"context": retriever, "input": RunnablePassthrough()}
        | rag_prompt
        | llm
        | StrOutputParser()
    )

    fallback_chain = (
        {"context": retriever, "input": RunnablePassthrough()}
        | rag_prompt
        | fallback_llm
        | StrOutputParser()
    )

    if user_query in _cache:
        return _cache[user_query]

    try:
        response = gemini_chain.invoke(user_query)

    except ResourceExhausted:
        print("⚠️ Gemini quota hit. Falling back to Groq (LLaMA-3).")
        response = fallback_chain.invoke(user_query)

    except Exception as e:
        print(f"⚠️ Gemini error ({type(e).__name__}). Falling back to Groq.")
        response = fallback_chain.invoke(user_query)

    _cache[user_query] = response
    return response

if __name__ == "__main__":
    test_query = "What strategic decision did a startup make to handle operational chaos while scaling?"

    print(f"Running RAG for query: '{test_query}'")

    answer = get_strato_guide_answer(test_query)

    print("-" * 60)
    print("STRATOGUIDE RESPONSE:")
    print(answer)
    print("-" * 60)
