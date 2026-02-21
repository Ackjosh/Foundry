from sqlalchemy import create_engine
from dotenv import load_dotenv
import os
import time

# Load environment variables
load_dotenv()

print("Starting connection test...")

# Use DATABASE_URL from .env file
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in .env file")

engine = create_engine(
    DATABASE_URL,
    connect_args={
        "sslmode": "require", 
        "connect_timeout": 10,
    },
    pool_pre_ping=True,
    pool_recycle=300,
)

try:
    start = time.time()
    with engine.connect() as conn:
        print("Connected successfully!")
    print("Connection time:", time.time() - start)

except Exception as e:
    print("Connection failed:", e)