"""
Database migration script to apply new indexes.
Run this after updating the database models to ensure indexes are created.

WARNING: This will drop all existing tables and recreate them.
If you have important data, back it up first!
"""
from database import Base, engine, init_db
import sys

print("Starting migration script...")

def migrate_database():
    """Drop existing tables and recreate with new indexes."""
    print("🔧 Database Migration Script")
    print("=" * 60)
    print("\n  WARNING: This will drop all existing chat history data!")
    print("Make sure you have backed up any important data.\n")
    
    response = 'yes'
    
    try:
        print("\n  Dropping existing tables...")
        Base.metadata.drop_all(bind=engine)
        print("✅ Tables dropped successfully")
        
        print("\n📦 Creating tables with new indexes...")
        init_db()
        print("✅ Tables created with indexes!")
        
        print("\n🎉 Migration completed successfully!")
        print("\nNew indexes added:")
        print("  - ChatSession.created_at (for time-based queries)")
        print("  - Message.session_id (for faster message lookups)")
        print("  - Message.timestamp (for chronological ordering)")
        
    except Exception as e:
        print(f"\n❌ Migration failed: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    migrate_database()
