import os
import glob
from typing import List
from dotenv import load_dotenv
from multiprocessing import Pool
from tqdm import tqdm
import chromadb
from langchain_community.vectorstores import Chroma

load_dotenv()

# Load the .env variables
PERSIST_DIRECTORY = os.environ.get('PERSIST_DIRECTORY')

# Fucntion to create a db Client
def create_db_client(persist_directory=PERSIST_DIRECTORY) -> chromadb.PersistentClient:
    """
    Creates a db client
    """
    client = chromadb.PersistentClient(path=persist_directory)
    return client


# Check if the database exists
def does_vectorstore_exist(persist_directory=PERSIST_DIRECTORY) -> bool:
    """
    Checks if vectorstore exists
    """
    if os.path.exists(os.path.join(persist_directory, 'index')):
        if os.path.exists(os.path.join(persist_directory, 'chroma-collections.parquet')) and os.path.exists(os.path.join(persist_directory, 'chroma-embeddings.parquet')):
            list_index_files = glob.glob(os.path.join(persist_directory, 'index/*.bin'))
            list_index_files += glob.glob(os.path.join(persist_directory, 'index/*.pkl'))
            # At least 3 documents are needed in a working vectorstore
            if len(list_index_files) > 3:
                return True
    return False

# Function to get all collections in the db
def get_all_collections(persist_directory=PERSIST_DIRECTORY) -> List[str]:
    """
    Returns a list of all collections in the db
    """
    if does_vectorstore_exist(persist_directory):
        return client.list_collections()
    else:
        return "No collections found"
