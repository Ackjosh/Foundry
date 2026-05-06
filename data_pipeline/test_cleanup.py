"""
Test script to verify chat history cleanup and limits.
Tests message limits per session and session limits per user.
"""
from chat_repository import (
    create_chat_session, 
    save_message, 
    get_user_sessions,
    get_session_messages,
    MAX_MESSAGES_PER_SESSION,
    MAX_SESSIONS_PER_USER
)
from datetime import datetime
import uuid


def test_message_limit():
    """Test that only MAX_MESSAGES_PER_SESSION messages are kept per session."""
    print("\n🧪 Testing message limit per session...")
    
    user_id = f"test_user_{uuid.uuid4()}"
    session_id = f"test_session_{uuid.uuid4()}"
    
    create_chat_session(user_id, session_id, "Test Message Limit")
    
    num_messages = MAX_MESSAGES_PER_SESSION + 50
    print(f"   Adding {num_messages} messages...")
    
    for i in range(num_messages):
        message_id = f"msg_{i}_{uuid.uuid4()}"
        role = "user" if i % 2 == 0 else "assistant"
        content = f"Test message {i}"
        save_message(session_id, message_id, role, content)
    
    messages = get_session_messages(session_id)
    message_count = len(messages)
    
    print(f"   Expected: {MAX_MESSAGES_PER_SESSION} messages")
    print(f"   Actual: {message_count} messages")
    
    if message_count <= MAX_MESSAGES_PER_SESSION:
        print("✅ Message limit test PASSED")
        if messages[-1]['content'] == f"Test message {num_messages - 1}":
            print("✅ Latest messages are preserved")
        else:
            print("⚠️ WARNING: Latest messages may not be preserved correctly")
    else:
        print("   ❌ Message limit test FAILED")
    
    return message_count <= MAX_MESSAGES_PER_SESSION


def test_session_limit():
    """Test that only MAX_SESSIONS_PER_USER sessions are kept per user."""
    print("\n🧪 Testing session limit per user...")
    
    user_id = f"test_user_{uuid.uuid4()}"
    
    num_sessions = MAX_SESSIONS_PER_USER + 10
    print(f"   Creating {num_sessions} sessions...")
    
    for i in range(num_sessions):
        session_id = f"session_{i}_{uuid.uuid4()}"
        create_chat_session(user_id, session_id, f"Test Session {i}")
    
    sessions = get_user_sessions(user_id)
    session_count = len(sessions)
    
    print(f"   Expected: {MAX_SESSIONS_PER_USER} sessions")
    print(f"   Actual: {session_count} sessions")
    
    if session_count <= MAX_SESSIONS_PER_USER:
        print("✅ Session limit test PASSED")
        if f"Test Session {num_sessions - 1}" in [s['title'] for s in sessions]:
            print("✅ Latest sessions are preserved")
        else:
            print("⚠️ WARNING: Latest sessions may not be preserved correctly")
    else:
        print("   ❌ Session limit test FAILED")
    
    return session_count <= MAX_SESSIONS_PER_USER


def test_basic_operations():
    print("\n🧪 Testing basic CRUD operations...")
    
    user_id = f"test_user_{uuid.uuid4()}"
    session_id = f"test_session_{uuid.uuid4()}"
    
    session = create_chat_session(user_id, session_id, "Basic Test")
    print("   ✅ Session created")
    
    msg = save_message(session_id, f"msg_1_{uuid.uuid4()}", "user", "Hello")
    print("   ✅ Message saved")
    
    sessions = get_user_sessions(user_id)
    if len(sessions) > 0:
        print("   ✅ Sessions retrieved")
    
    messages = get_session_messages(session_id)
    if len(messages) == 1 and messages[0]['content'] == "Hello":
        print("   ✅ Messages retrieved correctly")
        return True
    
    return False


def main():
    """Run all tests."""
    print("=" * 60)
    print("🚀 Starting Chat History Cleanup Tests")
    print("=" * 60)
    
    try:
        # Run tests
        test1 = test_basic_operations()
        test2 = test_message_limit()
        test3 = test_session_limit()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 Test Summary")
        print("=" * 60)
        print(f"   Basic Operations: {'✅ PASS' if test1 else '❌ FAIL'}")
        print(f"   Message Limit: {'✅ PASS' if test2 else '❌ FAIL'}")
        print(f"   Session Limit: {'✅ PASS' if test3 else '❌ FAIL'}")
        
        if all([test1, test2, test3]):
            print("\n🎉 All tests PASSED!")
        else:
            print("\n⚠️  Some tests FAILED. Please review the output above.")
        
    except Exception as e:
        print(f"\n❌ Error during testing: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
