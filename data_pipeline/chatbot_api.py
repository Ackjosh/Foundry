from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import concurrent.futures

from api_function import get_strato_guide_answer

app = FastAPI(title="StratoGuide Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

executor = concurrent.futures.ThreadPoolExecutor(max_workers=4)

class QueryRequest(BaseModel):
    query: str

@app.post("/chatbot")
async def chatbot_endpoint(payload: QueryRequest):
    try:
        loop = asyncio.get_running_loop()
        answer = await loop.run_in_executor(executor, get_strato_guide_answer, payload.query)
        return {"answer": answer}
    except Exception as e:
        print(f"CRASH LOG: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
