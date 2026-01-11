import os
import shutil
import fitz
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

load_dotenv()
PDF_PATH = os.path.join('raw_data', 'context.pdf')
CHROMA_PERSIST_DIR = os.path.join('parent_chroma_db')
COLLECTION_NAME = "startup_parent_child_rag"
query = "I'm worried about my startup's low revenue and need a quick fix. What early stage decision saved a successful company from failure?"

if os.path.exists(CHROMA_PERSIST_DIR):
    print(f"⚠️ Deleting existing Parent ChromaDB directory: {CHROMA_PERSIST_DIR}")
    shutil.rmtree(CHROMA_PERSIST_DIR)
    print("✅ Previous index deleted.")

print(f"Loading document from: {PDF_PATH}")
documents = []
try:
    pdf_document = fitz.open(PDF_PATH)
    full_text = "\n\n".join(page.get_text() for page in pdf_document)
    document = Document(page_content=full_text, metadata={"source": "context.pdf"})
    documents = [document]
    print(f"Text extracted from {len(pdf_document)} pages.")
except Exception as e:
    print(f"Error during PDF processing: {e}")
    exit()

parent_splitter = RecursiveCharacterTextSplitter(chunk_size=1200, chunk_overlap=0)
child_splitter = RecursiveCharacterTextSplitter(chunk_size=250, chunk_overlap=25)

embedding_function = SentenceTransformerEmbeddings(model_name="BAAI/bge-small-en-v1.5")

vector_store = Chroma(
    collection_name=COLLECTION_NAME,
    embedding_function=embedding_function,
    persist_directory=CHROMA_PERSIST_DIR
)

parent_store = {}

def split_into_documents(splitter, docs):
    try:
        return splitter.split_documents(docs)
    except Exception:
        out = []
        for d in docs:
            try:
                parts = splitter.split_text(d.page_content)
            except Exception:
                parts = [d.page_content]
            for part in parts:
                out.append(Document(page_content=part, metadata=d.metadata.copy() if d.metadata else {}))
        return out

parent_docs = split_into_documents(parent_splitter, documents)

child_docs_for_index = []
for i, pdoc in enumerate(parent_docs):
    pid = f"parent_{i}"
    parent_store[pid] = pdoc
    child_docs = split_into_documents(child_splitter, [pdoc])
    for cdoc in child_docs:
        meta = dict(cdoc.metadata or {})
        meta["parent_id"] = pid
        child_docs_for_index.append(Document(page_content=cdoc.page_content, metadata=meta))

try:
    vector_store.add_documents(child_docs_for_index)
except Exception:
    texts = [d.page_content for d in child_docs_for_index]
    metadatas = [d.metadata for d in child_docs_for_index]
    vector_store.add_texts(texts, metadatas=metadatas)

try:
    vector_store.persist()
except Exception:
    pass

print("\n--- Retrieval Test with manual Parent-Child retrieval ---")
print(f"Searching for: '{query}'")

try:
    child_results = vector_store.similarity_search(query, k=4)
except Exception:
    child_results = vector_store.similarity_search(query, k=4)

retrieved_parent_ids = []
retrieved_parents = []
for c in child_results:
    pid = (c.metadata or {}).get("parent_id")
    if pid and pid not in retrieved_parent_ids:
        retrieved_parent_ids.append(pid)
        retrieved_parents.append(parent_store.get(pid))

print(f"\n--- Top {len(retrieved_parents)} Retrieved PARENT Chunks ---")
for i, doc in enumerate(retrieved_parents):
    if doc is None:
        continue
    print(f"[{i+1}] Retrieved Content (Parent Chunk):\n{doc.page_content}\n---")
    print(f"Length: {len(doc.page_content)} characters.")

print("\n🎉 Retrieval Test Complete. Check the output for highly relevant, full context.")
