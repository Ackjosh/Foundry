# Foundry - AI-Powered Startup Advisory Platform

A full-stack intelligent advisory platform that helps entrepreneurs navigate common startup challenges using AI-powered insights from real case studies and validated strategies.

-----

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Advantages](#advantages)
9. [Limitations](#limitations)
10. [Development](#development)
11. [Customization](#customization)
12. [Contributing](#contributing)
13. [Contact](#contact)

-----

## 📖 Introduction

Foundry addresses a critical challenge faced by entrepreneurs: finding reliable, actionable advice for navigating the complex startup landscape. This platform leverages cutting-edge Retrieval-Augmented Generation (RAG) technology to provide personalized, data-driven guidance based on real case studies and validated strategies.

The system combines a modern, responsive React frontend with an intelligent Python-based AI backend, creating a seamless experience for founders seeking solutions to their most pressing business challenges.

-----

## ✨ Features

#### For Entrepreneurs (Web Application)

- **AI Chatbot Advisor**: Interactive conversational interface powered by LangChain and large language models for personalized guidance
- **Multi-LLM interface**: Uses Groq AI as a fallback LLM after Gemini API rate limits to prevent stalling the responses
- **Multi-Chat Sessions**: Manage multiple conversation threads simultaneously to organize different topics
- **Problem-Specific Solutions**: Dedicated pages for common startup challenges:
  - Product-Market Fit
  - Scaling Challenges
  - Cash Flow Management
- **Markdown Support**: Rich text formatting in chat responses for better readability
- **Context-Aware Responses**: AI retrieves relevant information from startup case studies and best practices
- **Intuitive Navigation**: Clean, modern interface with sidebar navigation and responsive design

#### Platform Capabilities

- **RAG-Powered Intelligence**: Advanced retrieval system using ChromaDB for vector storage and FAISS for similarity search
- **Real-Time API**: Fast, asynchronous FastAPI backend with concurrent request handling
- **Document Processing**: Automated chunking and indexing of startup knowledge base
- **Semantic Search**: Intelligent retrieval of relevant information using sentence transformers
- **Scalable Architecture**: Modular design supporting easy expansion of knowledge base and features

-----

## 🏗️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **TanStack Query** for data fetching
- **Lucide React** for icons
- **React Markdown** for formatted responses

### Backend
- **FastAPI** for RESTful API
- **LangChain** for LLM orchestration
- **ChromaDB** for vector storage
- **FAISS** for similarity search
- **Sentence Transformers** for embeddings
- **Google Generative AI / Groq** for LLM inference
- **PyMuPDF** for document processing
- **Python 3.9+** runtime

-----

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

## ⚙️ Getting Started

### Prerequisites

- **Node.js** 18+ and **Bun** (or npm/yarn)
- **Python** 3.9+
- **pip** for Python package management
- API keys for:
  - Google Generative AI (Gemini) or
  - Groq AI

### 🚀 Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd Foundry
```

#### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

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

-----

## 💬 Usage

#### For Entrepreneurs:

1. Ensure both frontend and backend servers are running
2. Navigate to `http://localhost:5173` in your web browser
3. Browse the home page to explore different problem categories
4. Click on a category to learn more about specific challenges
5. Access the chatbot by clicking the "Chat with AI Advisor" button
6. Type your startup-related questions in the chat interface
7. Create new chat sessions to organize different topics
8. Delete or switch between chats using the sidebar

#### For Developers:

1. Add new documents to `data_pipeline/raw_data/` to expand the knowledge base
2. Run the indexing pipeline to process new documents
3. Customize prompts in `04_rag_chain.py` to modify AI behavior
4. Add new problem pages in `src/pages/problems/` for additional categories
5. Use the development scripts for building and testing

## 📡 API Endpoints

### POST `/chatbot`
Query the AI advisor with a startup-related question.

**Request:**
```json
{
  "query": "How can I find product-market fit?"
}
```

**Response:**
```json
{
  "answer": "Based on successful case studies and validated strategies..."
}
```

### GET `/health`
Health check endpoint to verify API availability.

**Response:**
```json
{
  "status": "ok"
}
```

-----

## ✅ Advantages

- **Data-Driven Insights**: Responses are grounded in real startup case studies and validated strategies, not generic advice
- **Instant Access to Knowledge**: Get immediate answers without searching through multiple resources or hiring expensive consultants
- **Scalable AI Architecture**: Built on modern RAG technology that can easily expand to include more knowledge sources
- **User Persistence**: Chat history is stored and syncs across devices
- **Context-Aware Responses**: The system retrieves the most relevant information for each specific query
- **Beautiful User Experience**: Modern, intuitive interface built with industry-standard design components
- **Fast Performance**: Optimized vector search and asynchronous processing ensure quick response times
- **Multi-Modal Learning**: Supports various document types (PDF, text) for knowledge ingestion
- **Privacy-Focused**: Run locally or deploy privately without sharing sensitive startup information
- **Cost-Effective**: Open-source solution with optional API costs only for LLM inference

-----

## ⚠️ Limitations

- **LLM Dependency**: Requires active API keys for Google Generative AI or Groq, which may incur costs
- **Knowledge Base Scope**: Accuracy and relevance depend on the quality and coverage of documents in the knowledge base
- **No Real-Time Updates**: Knowledge base must be manually updated and re-indexed to include new information
- **Limited Authentication**: Current version has basic authentication pages without full user management
- **English Language Only**: Optimized for English content; multilingual support not implemented
- **No Voice Interface**: Text-only interaction; voice input/output not supported
- **Internet Required**: Both API calls and frontend require active internet connection

-----

## 🛠️ Development

### Frontend Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build optimized production bundle
npm run build:dev    # Build development bundle
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

### Backend Development

Run the FastAPI server with auto-reload for development:

```bash
uvicorn chatbot_api:app --reload --port 8000
```

### Testing the Pipeline

Test individual components of the RAG pipeline:

```bash
# Test query retrieval
python 02_query_index.py

# Test parent document retrieval
python 03_parent_retriever.py

# Test the complete RAG chain
python 04_rag_chain.py
```

-----

## 🎨 Customization

### Adding New Problem Categories

1. Create a new page component in `src/pages/problems/`
2. Add the route in your router configuration
3. Update the problems array in `Home.tsx`
4. Add relevant source documents to `data_pipeline/raw_data/`
5. Re-run the indexing pipeline: `python 01_chunk_and_index.py`

### Modifying AI Behavior

- **Prompt Engineering**: Edit system prompts in `04_rag_chain.py`
- **Retrieval Settings**: Adjust chunk size, overlap, and top-k parameters in `03_parent_retriever.py`
- **Embedding Model**: Change the sentence transformer model in `01_chunk_and_index.py`
- **LLM Provider**: Switch between Google Generative AI and Groq in `api_function.py`

### Styling Customization

- Modify `tailwind.config.ts` for theme colors and design tokens
- Update component styles in `src/components/ui/` directory
- Edit global styles in `src/index.css`

-----

## 🤝 Contributing

Contributions are welcome to enhance the functionality and design of Foundry! Here's how you can help:

1. **Fork the repository**

2. **Create a new feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and commit them:**
   ```bash
   git commit -m "Add: brief description of your feature"
   ```

4. **Push your changes:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a pull request** with a detailed description of your changes

### Areas for Contribution

- Add more startup case studies to the knowledge base
- Implement user authentication and chat persistence
- Create additional problem category pages
- Improve RAG retrieval accuracy
- Add unit and integration tests
- Enhance mobile responsiveness
- Implement voice interface support

-----

## 📞 Contact

For questions, suggestions, or collaboration opportunities:

- **GitHub**: [Ackjosh](https://github.com/Ackjosh)
- **Email**: akshatdjoshi@gmail.com

-----