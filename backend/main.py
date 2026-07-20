from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from ml_service import detect_fraud
from ai_service import explain_transaction

app = FastAPI(title="AI Fraud Report Generator")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ai-fraud-copilot.netlify.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "data"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def home():
    return {"message": "AI Fraud Report Generator Running"}

@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    path = f"{UPLOAD_DIR}/{file.filename}"

    with open(path, "wb") as f:
        f.write(await file.read())

    suspicious = detect_fraud(path)

    results = []

    for txn in suspicious:
        explanation = explain_transaction(txn)

        results.append({
            "transaction": txn,
            "ai_explanation": explanation
        })

    return {
        "suspicious_count": len(results),
        "results": results
    }