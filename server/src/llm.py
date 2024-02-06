# # 1. Get the llms (local or cloud)
# # 2. get the files from the db
# # 3. Two wasy to load single load or multiple load
# # 4. Create them into chunks
# # 5. Create the embeddings
# # 6. Create the vectorstore
# # 7. Save to the vectorstore
# # 8. Search and return the results

# # FUTURE WORK
# # 9. Persistant chat history
# # 10. Add more llms

from langchain_community.document_loaders import PyMuPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import HuggingFaceHub
from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain.chains import RetrievalQA
from langchain_community.llms import GPT4All,LlamaCpp
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from src.db import create_db_client, does_vectorstore_exist
from langchain_community.vectorstores import Chroma

import os
import time
from dotenv import load_dotenv

load_dotenv()


# Load the env variables
MODEL_TYPE = os.environ.get('MODEL_TYPE')
MODEL_PATH = os.environ.get('MODEL_PATH')
MODEL_N_CTX = os.environ.get('MODEL_N_CTX')
MODEL_N_BATCH = int(os.environ.get('MODEL_N_BATCH',8))
PERSIST_DIRECTORY = os.environ.get('PERSIST_DIRECTORY')
COLLECTION_NAME = os.environ.get('COLLECTION_NAME')

# Initializing the llm
HUGGINGFACEHUB_API_TOKEN = os.environ.get('HUGGINGFACEHUB_API_TOKEN')
repo_id = "google/flan-t5-xxl"
retriever = ""

# llm = HuggingFaceHub(
#     repo_id=repo_id, model_kwargs={"temperature": 0.5, "max_length": 64}
# )
llm = GPT4All(model=MODEL_PATH,
                      max_tokens=1000, 
                      backend='gptj', 
                      n_batch=8, 
                      verbose=False)

# Getting the files from the storage
def load_pdf(file_path):
    #Batch load the files
    # Single Load the File
    loader = PyMuPDFLoader(file_path)
    data = loader.load()
    return data


def create_chunks(data, chunk_size=250, chunk_overlap=30, model_name="all-MiniLM-L6-v2"):
    # Splitting the text
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    splits = text_splitter.split_documents(data)
    
    # Creating the Embeddings
    embeddings = HuggingFaceEmbeddings(model_name=model_name)

    
    return splits, embeddings

def create_vectorstore(splits, embeddings):
    
    # Check if DB exists => yes then append to it : no then create a new DB
    if not does_vectorstore_exist(PERSIST_DIRECTORY):
            clinet = create_db_client(PERSIST_DIRECTORY)

    db = Chroma.from_documents(
        documents=splits,
        embedding=embeddings, 
        persist_directory=PERSIST_DIRECTORY, 
        collection_name=COLLECTION_NAME 
    )
    db.persist()
    retriever = db.as_retriever(search_kwargs={"k":4})
    return db

async def ask_llm(query):
        """Asks the LLM a question and returns its answer.

        Args:
        query: The question to ask the LLM.

        Returns:
        The LLM's response to the question.
        """
        template = """Question: {query}

        Answer: Let's think step by step."""

        prompt = PromptTemplate(template=template, input_variables=["question"])
        qa = RetrievalQA.from_chain_type(   llm=llm, 
                                            chain_type="stuff", 
                                            retriever=retriever, 
                                            return_source_documents=True,
                                            verbose=True,
                                            )
        response = qa(query)
        return response
