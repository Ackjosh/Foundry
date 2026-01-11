import os
import fitz
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
import shutil

CHROMA_PERSIST_DIR = os.path.join('chroma_db')

if os.path.exists(CHROMA_PERSIST_DIR):
    print(f"⚠️ Deleting existing ChromaDB directory: {CHROMA_PERSIST_DIR}")
    shutil.rmtree(CHROMA_PERSIST_DIR)
    print("✅ Previous index deleted.")

load_dotenv()

PDF_PATH = os.path.join('raw_data', 'context.pdf')
COLLECTION_NAME = "startup_advice_rag"

print(f"Loading document from: {PDF_PATH}")

documents = []
try:
    pdf_document = fitz.open(PDF_PATH)
    full_text = ""
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        full_text += page.get_text() + "\n\n"

    document = Document(
        page_content=full_text,
        metadata={"source": "context.pdf", "doc_id": "startup_playbook_v1"}
    )
    documents = [document]
    print(f"Text extracted from {len(pdf_document)} pages.")

except FileNotFoundError:
    print(f"Error: File not found at {PDF_PATH}. Check your raw_data folder.")
    exit()
except Exception as e:
    print(f"Error during PDF processing: {e}")
    exit()

print("Splitting document into smaller, highly-focused context chunks...")

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=450,
    chunk_overlap=50,
    separators=["\n\n\n", "\n\n", "\n", " ", ""]
)

chunks = text_splitter.split_documents(documents)
print(f"Successfully created {len(chunks)} chunks.")

print("Initializing local SentenceTransformer embedding model (all-MiniLM-L6-v2)...")
embedding_function = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

print(f"Creating or loading ChromaDB index in: {CHROMA_PERSIST_DIR}")
vector_store = Chroma.from_documents(
    documents=chunks,
    embedding=embedding_function,
    collection_name=COLLECTION_NAME,
    persist_directory=CHROMA_PERSIST_DIR
)

vector_store.persist()

print("\n--- Indexing Complete --- 🎉")
print(f"Total chunks indexed: {len(chunks)}")
print(f"Vector Database saved and ready for use in: {CHROMA_PERSIST_DIR}")
