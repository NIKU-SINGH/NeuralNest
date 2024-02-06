from fastapi import FastAPI, File, UploadFile
from dotenv import load_dotenv
#importing routes
from src.routes import router as APP_ROUTER

import os 

# load env 
load_dotenv()
host = os.environ.get("HOST", "0.0.0.0")  # Use default if not set in .env
port = int(os.environ.get("PORT", 8000))
PERSIST_DIRECTORY = os.environ.get('PERSIST_DIRECTORY')

app = FastAPI()

# Attatching other routes
app.include_router(APP_ROUTER,tags=['APP'],prefix='/api/v1')

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/healthcheck")
async def healthcheck():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=host, port=port)
