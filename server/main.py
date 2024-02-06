from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
