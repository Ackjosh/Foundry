"""
Database models and connection setup for PostgreSQL chat history.
Uses SQLAlchemy ORM for database operations.
"""
from sqlalchemy import create_engine, Column, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

Base = declarative_base()


class ChatSession(Base):
    """Represents a chat session for a user."""
    __tablename__ = "chat_sessions"
    
    session_id = Column(String(50), primary_key=True)
    user_id = Column(String(100), nullable=False, index=True)
    title = Column(String(200), default="New Chat")
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship with messages
    messages = relationship("Message", back_populates="session", cascade="all, delete-orphan")

    def to_dict(self):
        """Convert session to dictionary for API responses."""
        return {
            "id": self.session_id,
            "title": self.title,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class Message(Base):
    """Represents a single message in a chat session."""
    __tablename__ = "messages"
    
    message_id = Column(String(50), primary_key=True)
    session_id = Column(String(50), ForeignKey("chat_sessions.session_id", ondelete="CASCADE"), nullable=False, index=True)
    role = Column(String(20), nullable=False)  # 'user' or 'assistant'
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationship with session
    session = relationship("ChatSession", back_populates="messages")

    def to_dict(self):
        """Convert message to dictionary for API responses."""
        return {
            "role": self.role,
            "content": self.content,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
        }


# Database connection
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError(
        "DATABASE_URL environment variable not set. "
        "Please add it to your .env file. "
        "Example: DATABASE_URL=postgresql://user:password@host:port/database"
    )

# Create engine and session factory
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    """Initialize database tables."""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")


def get_db():
    """Get database session for dependency injection."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


if __name__ == "__main__":
    # Test database connection and create tables
    print("Testing database connection...")
    init_db()
