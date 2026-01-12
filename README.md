# Foundry - AI-Powered Startup Advisory Platform

A full-stack intelligent advisory platform that helps entrepreneurs navigate common startup challenges using AI-powered insights from real case studies and validated strategies.

## 🌟 Overview

Foundry leverages Retrieval-Augmented Generation (RAG) technology to provide personalized, data-driven advice for startup founders. The platform combines a modern React frontend with a Python-based AI backend to deliver intelligent solutions for critical business problems.

## ✨ Key Features

- **🤖 AI Chatbot Advisor**: Interactive conversational interface powered by LangChain and large language models
- **📊 Problem-Specific Solutions**: Curated guidance for common startup challenges:
  - Product-Market Fit
  - Scaling Challenges  
  - Cash Flow Management
- **🔍 RAG-Powered Insights**: Retrieves relevant information from startup case studies and best practices
- **💬 Multi-Chat Sessions**: Manage multiple conversation threads simultaneously
- **🎨 Modern UI**: Beautiful, responsive interface built with shadcn/ui and Tailwind CSS
- **⚡ Fast & Efficient**: Optimized vector search using ChromaDB and FAISS

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Lucide React** for icons

### Backend
- **FastAPI** for RESTful API
- **LangChain** for LLM orchestration
- **ChromaDB** for vector storage
- **FAISS** for similarity search
- **Sentence Transformers** for embeddings
- **Google Generative AI / Groq** for LLM inference
- **PyMuPDF** for document processing

## 📁 Project Structure

```
Foundry/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── AppSidebar.tsx       # Application sidebar
│   │   ├── Layout.tsx           # Main layout wrapper
│   │   └── Navigation.tsx       # Navigation component
│   ├── pages/                   # Page components
│   │   ├── Home.tsx             # Landing page
│   │   ├── Chatbot.tsx          # Main chatbot interface
│   │   ├── Login.tsx            # Authentication
│   │   ├── Register.tsx         # User registration
│   │   └── problems/            # Problem-specific pages
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities
│   └── App.tsx                  # Root component
├── data_pipeline/               # Backend AI pipeline
│   ├── 01_chunk_and_index.py   # Document processing
│   ├── 02_query_index.py       # Query vector store
│   ├── 03_parent_retriever.py  # Parent document retrieval
│   ├── 04_rag_chain.py         # RAG chain implementation
│   ├── api_function.py         # Core API logic
│   ├── chatbot_api.py          # FastAPI application
│   ├── chroma_db/              # Vector database storage
│   └── raw_data/               # Source documents
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **Bun** (or npm/yarn)
- **Python** 3.9+
- **pip** for Python package management
- API keys for:
  - Google Generative AI (Gemini) or
  - Groq AI

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd Foundry
```

#### 2. Frontend Setup

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The frontend will be available at `http://localhost:5173`

#### 3. Backend Setup

```bash
# Navigate to data pipeline
cd data_pipeline

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

#### 4. Environment Configuration

Create a `.env` file in the `data_pipeline` directory:

```env
GROQ_API_KEY=your_groq_api_key
# OR
GOOGLE_API_KEY=your_google_api_key
```

#### 5. Initialize Vector Database

```bash
# Process documents and create vector index
python 01_chunk_and_index.py
```

#### 6. Start the Backend Server

```bash
# Run FastAPI server
python chatbot_api.py
```

The API will be available at `http://localhost:8000`

## 🎯 Usage

1. **Start both servers** (frontend and backend)
2. **Navigate to** `http://localhost:5173` in your browser
3. **Explore problem categories** on the home page
4. **Open the chatbot** to ask questions about your startup challenges
5. **Create multiple chat sessions** for different topics
6. **Receive AI-powered advice** based on real case studies

## 📡 API Endpoints

### POST `/chatbot`
Query the AI advisor with a question.

**Request:**
```json
{
  "query": "How can I find product-market fit?"
}
```

**Response:**
```json
{
  "answer": "Based on successful case studies..."
}
```

### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## 🛠️ Development

### Frontend Scripts

```bash
bun run dev        # Start development server
bun run build      # Build for production
bun run preview    # Preview production build
bun run lint       # Run ESLint
```

### Backend Development

```bash
# Run with auto-reload
uvicorn chatbot_api:app --reload --port 8000
```

## 🎨 Customization

### Adding New Problem Categories

1. Create a new page component in `src/pages/problems/`
2. Add route in your router configuration
3. Update the problems array in [Home.tsx](src/pages/Home.tsx)
4. Add relevant documents to `data_pipeline/raw_data/`
5. Re-run the indexing pipeline

### Modifying the AI Behavior

- **Prompt engineering**: Edit prompts in [04_rag_chain.py](data_pipeline/04_rag_chain.py)
- **Retrieval settings**: Adjust parameters in [03_parent_retriever.py](data_pipeline/03_parent_retriever.py)
- **Embedding model**: Change model in [01_chunk_and_index.py](data_pipeline/01_chunk_and_index.py)

## 📦 Building for Production

### Frontend

```bash
bun run build
```

Output will be in the `dist/` directory.

### Backend

For production deployment:
1. Set appropriate environment variables
2. Use a production ASGI server (Gunicorn + Uvicorn)
3. Configure CORS for your production domain
4. Set up proper authentication and rate limiting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- Powered by [LangChain](https://www.langchain.com/)
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for entrepreneurs navigating the startup journey**