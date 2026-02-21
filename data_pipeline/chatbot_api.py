from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import concurrent.futures
import uuid

from api_function import get_strato_guide_answer
from database import init_db
from chat_repository import (
    create_chat_session,
    save_message,
    get_user_sessions,
    get_session_messages,
    delete_session,
    update_session_title,
    get_session_with_messages
)

app = FastAPI(title="StratoGuide Chatbot with Chat History")

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    try:
        init_db()
        print("✅ Database initialized successfully!")
    except Exception as e:
        print(f"⚠️ Database initialization warning: {e}")
        print("Make sure DATABASE_URL is set in .env file")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

executor = concurrent.futures.ThreadPoolExecutor(max_workers=4)


# Request Models
class QueryRequest(BaseModel):
    query: str
    user_id: str
    session_id: str


class NewChatRequest(BaseModel):
    user_id: str
    session_id: str
    title: str = "New Chat"


class UpdateTitleRequest(BaseModel):
    title: str


# Main chatbot endpoint with history saving
@app.post("/chatbot")
async def chatbot_endpoint(payload: QueryRequest):
    try:
        # Save user message to database
        user_msg_id = str(uuid.uuid4())
        save_message(payload.session_id, user_msg_id, "user", payload.query)
        
        # Get AI response
        loop = asyncio.get_running_loop()
        answer = await loop.run_in_executor(executor, get_strato_guide_answer, payload.query)
        
        # Save assistant message to database
        ai_msg_id = str(uuid.uuid4())
        save_message(payload.session_id, ai_msg_id, "assistant", answer)
        
        return {"answer": answer}
    except Exception as e:
        print(f"CRASH LOG: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


# Chat history endpoints
@app.get("/chat-history/{user_id}")
async def get_chat_history(user_id: str):
    """Get all chat sessions for a user."""
    try:
        sessions = get_user_sessions(user_id)
        return {"sessions": sessions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/chat/{session_id}/messages")
async def get_messages(session_id: str):
    """Get all messages for a specific chat session."""
    try:
        messages = get_session_messages(session_id)
        return {"messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/chat/{session_id}")
async def get_session(session_id: str):
    """Get a session with all its messages."""
    try:
        session = get_session_with_messages(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        return session
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chat/new")
async def create_new_chat(payload: NewChatRequest):
    """Create a new chat session."""
    try:
        session = create_chat_session(payload.user_id, payload.session_id, payload.title)
        return {"session": session}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/chat/{session_id}")
async def delete_chat(session_id: str, user_id: str = Query(...)):
    """Delete a chat session (with user authorization)."""
    try:
        success = delete_session(session_id, user_id)
        if not success:
            raise HTTPException(status_code=404, detail="Session not found or unauthorized")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/chat/{session_id}/title")
async def update_title(session_id: str, payload: UpdateTitleRequest):
    """Update the title of a chat session."""
    try:
        session = update_session_title(session_id, payload.title)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        return {"session": session}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
