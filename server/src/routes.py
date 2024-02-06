from fastapi import APIRouter
from fastapi import Request,Query
from fastapi import FastAPI, File, UploadFile
from src.llm import ask_llm
from src.llm import ask_llm, create_chunks, create_vectorstore, load_pdf
import os
import uuid
import hashlib
import shutil
from datetime import datetime
import json

router = APIRouter()

@router.post("/upload")
async def create_upload_file(file: UploadFile):
    
    # Check if the uploaded file is a PDF
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are allowed"}
    
    # Create the 'uploaded_files' folder if it doesn't exist
    os.makedirs("uploaded_files", exist_ok=True)
    # Save the file to the 'uploaded_files' folder
    unique_filename = get_unique_filename(file.filename)
    file_path = os.path.join("uploaded_files", unique_filename).replace("\\", "/")
    
    with  open(file_path, "wb") as pdf_file:
        shutil.copyfileobj(file.file, pdf_file)
    
    # Load the PDF file
    data = load_pdf(file_path)
    
    # Create chunks
    splits, embeddings = create_chunks(data, chunk_size=250, chunk_overlap=30, model_name="all-MiniLM-L6-v2")
    
    # Create a vectorstore
    db = create_vectorstore(splits, embeddings)
    
    return {"message": "PDF file uploaded successfully!", "filename": file.filename}
@router.get("/upload")
def index():
    return {"message": "Upload successfully!"}  

@router.post("/query")
async def handle_query(query: str = Query(..., description="The user's query")):
    response = query# Replace with your response generation logic
    
    # Ask the llm a question
    response = await ask_llm(query)
    return {"response": response}

def get_unique_filename(file_name: str, max_length: int = 7) -> str:
    # Generate a unique identifier (hash) using SHA-256
    unique_identifier = hashlib.sha256(file_name.encode()).hexdigest()

    # Truncate the hash to the specified max_length
    truncated_identifier = unique_identifier[:max_length]

    # Get the file extension
    file_extension = os.path.splitext(file_name)[1]

    # Create a unique filename
    unique_filename = f"{truncated_identifier}{file_extension}"

    return unique_filename