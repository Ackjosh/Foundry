import os
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from dotenv import load_dotenv

load_dotenv()
CHROMA_PERSIST_DIR = os.path.join('chroma_db')
COLLECTION_NAME = "startup_advice_rag"

embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

try:
    vector_store = Chroma(
        persist_directory=CHROMA_PERSIST_DIR,
        embedding_function=embedding_function,
        collection_name=COLLECTION_NAME
    )
    print("✅ Successfully loaded Vector Database.")
except Exception as e:
    print(f"❌ Error loading ChromaDB. Did you run 01_chunk_and_index.py? Error: {e}")
    exit()

query = "I'm worried about my startup's low revenue and need a quick fix. What early stage decision saved a successful company from failure?"
K_RESULTS = 5

print(f"\nSearching for conversational query: '{query}'")

retrieved_docs = vector_store.similarity_search(query, k=K_RESULTS)

print(f"\n--- Top {K_RESULTS} Retrieved Chunks (Context for LLM) ---")
for i, doc in enumerate(retrieved_docs):
    print(f"[{i+1}] Source: {doc.metadata.get('source', 'N/A')}")
    print(f"Score/Relevance: [Simulated Score: 0.85+]")
    print(f"Chunk Content:\n{doc.page_content[:450]}...\n---")
