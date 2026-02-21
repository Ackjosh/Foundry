"""
Repository pattern for chat history CRUD operations.
Handles all database interactions for chat sessions and messages.
"""
from database import SessionLocal, ChatSession, Message
from datetime import datetime, timedelta
from typing import List, Dict, Optional

# Configuration for chat history limits
MAX_MESSAGES_PER_SESSION = 100
MAX_SESSIONS_PER_USER = 20
SESSION_RETENTION_DAYS = 30 


def cleanup_session_messages(db, session_id: str) -> int:
    """
    Remove excess messages from a session, keeping only the latest MAX_MESSAGES_PER_SESSION.
    
    Args:
        db: Database session
        session_id: Session ID to cleanup
    
    Returns:
        Number of messages deleted
    """
    try:
        # Count total messages in the session
        message_count = db.query(Message).filter(Message.session_id == session_id).count()
        
        if message_count <= MAX_MESSAGES_PER_SESSION:
            return 0
        
        # Get messages to delete (oldest ones)
        messages_to_delete = message_count - MAX_MESSAGES_PER_SESSION
        old_messages = db.query(Message)\
            .filter(Message.session_id == session_id)\
            .order_by(Message.timestamp.asc())\
            .limit(messages_to_delete)\
            .all()
        
        for msg in old_messages:
            db.delete(msg)
        
        return len(old_messages)
    except Exception as e:
        print(f"Error during message cleanup: {e}")
        return 0


def cleanup_user_sessions(db, user_id: str) -> int:
    """
    Remove excess and old sessions for a user.
    Keeps only the latest MAX_SESSIONS_PER_USER sessions and deletes sessions older than SESSION_RETENTION_DAYS.
    
    Args:
        db: Database session
        user_id: User ID to cleanup
    
    Returns:
        Number of sessions deleted
    """
    try:
        deleted_count = 0
        
        # Delete sessions older than retention period
        cutoff_date = datetime.utcnow() - timedelta(days=SESSION_RETENTION_DAYS)
        old_sessions = db.query(ChatSession)\
            .filter(ChatSession.user_id == user_id, ChatSession.created_at < cutoff_date)\
            .all()
        
        for session in old_sessions:
            db.delete(session)
            deleted_count += 1
        
        # Keep only the latest MAX_SESSIONS_PER_USER sessions
        session_count = db.query(ChatSession).filter(ChatSession.user_id == user_id).count()
        
        if session_count > MAX_SESSIONS_PER_USER:
            sessions_to_delete = session_count - MAX_SESSIONS_PER_USER
            excess_sessions = db.query(ChatSession)\
                .filter(ChatSession.user_id == user_id)\
                .order_by(ChatSession.updated_at.asc())\
                .limit(sessions_to_delete)\
                .all()
            
            for session in excess_sessions:
                db.delete(session)
                deleted_count += 1
        
        return deleted_count
    except Exception as e:
        print(f"Error during session cleanup: {e}")
        return 0


def create_chat_session(user_id: str, session_id: str, title: str = "New Chat") -> Dict:
    """
    Create a new chat session.
    
    Args:
        user_id: Clerk user ID
        session_id: Unique session identifier
        title: Chat title (default: "New Chat")
    
    Returns:
        Dictionary representation of created session
    """
    db = SessionLocal()
    try:
        session = ChatSession(
            session_id=session_id,
            user_id=user_id,
            title=title
        )
        db.add(session)
        db.commit()
        db.refresh(session)
        
        # Cleanup old/excess sessions for this user
        cleanup_user_sessions(db, user_id)
        db.commit()
        
        return session.to_dict()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


def save_message(session_id: str, message_id: str, role: str, content: str) -> Dict:
    """
    Save a message to a chat session.
    
    Args:
        session_id: Session ID to save message to
        message_id: Unique message identifier
        role: 'user' or 'assistant'
        content: Message content
    
    Returns:
        Dictionary representation of saved message
    """
    db = SessionLocal()
    try:
        message = Message(
            message_id=message_id,
            session_id=session_id,
            role=role,
            content=content
        )
        db.add(message)
        
        # Update session's updated_at timestamp
        session = db.query(ChatSession).filter(ChatSession.session_id == session_id).first()
        if session:
            session.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(message)
        
        # Cleanup excess messages in this session
        cleanup_session_messages(db, session_id)
        db.commit()
        
        return message.to_dict()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


def get_user_sessions(user_id: str) -> List[Dict]:
    """
    Get all chat sessions for a user.
    
    Args:
        user_id: Clerk user ID
    
    Returns:
        List of session dictionaries, ordered by most recent
    """
    db = SessionLocal()
    try:
        sessions = db.query(ChatSession)\
            .filter(ChatSession.user_id == user_id)\
            .order_by(ChatSession.updated_at.desc())\
            .all()
        return [session.to_dict() for session in sessions]
    finally:
        db.close()


def get_session_messages(session_id: str) -> List[Dict]:
    """
    Get all messages for a chat session.
    
    Args:
        session_id: Session ID
    
    Returns:
        List of message dictionaries, ordered chronologically
    """
    db = SessionLocal()
    try:
        messages = db.query(Message)\
            .filter(Message.session_id == session_id)\
            .order_by(Message.timestamp.asc())\
            .all()
        return [message.to_dict() for message in messages]
    finally:
        db.close()


def delete_session(session_id: str, user_id: str) -> bool:
    """
    Delete a chat session (only if it belongs to the user).
    
    Args:
        session_id: Session ID to delete
        user_id: User ID for authorization check
    
    Returns:
        True if deleted, False if not found or unauthorized
    """
    db = SessionLocal()
    try:
        session = db.query(ChatSession)\
            .filter(ChatSession.session_id == session_id, ChatSession.user_id == user_id)\
            .first()
        
        if not session:
            return False
        
        db.delete(session)  # Messages cascade delete automatically
        db.commit()
        return True
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


def update_session_title(session_id: str, title: str) -> Optional[Dict]:
    """
    Update the title of a chat session.
    
    Args:
        session_id: Session ID
        title: New title
    
    Returns:
        Updated session dictionary or None if not found
    """
    db = SessionLocal()
    try:
        session = db.query(ChatSession)\
            .filter(ChatSession.session_id == session_id)\
            .first()
        
        if not session:
            return None
        
        session.title = title
        session.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(session)
        return session.to_dict()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


def get_session_with_messages(session_id: str) -> Optional[Dict]:
    """
    Get a session with all its messages in one query.
    
    Args:
        session_id: Session ID
    
    Returns:
        Dictionary with session info and messages
    """
    db = SessionLocal()
    try:
        session = db.query(ChatSession)\
            .filter(ChatSession.session_id == session_id)\
            .first()
        
        if not session:
            return None
        
        return {
            **session.to_dict(),
            "messages": [msg.to_dict() for msg in session.messages]
        }
    finally:
        db.close()


if __name__ == "__main__":
    # Test CRUD operations
    print("Testing chat repository...")
    
    # Create test session
    test_session = create_chat_session("user123", "test_session_1", "Test Chat")
    print(f"✅ Created session: {test_session}")
    
    # Save test message
    test_msg = save_message("test_session_1", "msg1", "user", "Hello!")
    print(f"✅ Saved message: {test_msg}")
    
    # Get user sessions
    sessions = get_user_sessions("user123")
    print(f"✅ User sessions: {sessions}")
    
    # Get session messages
    messages = get_session_messages("test_session_1")
    print(f"✅ Session messages: {messages}")
