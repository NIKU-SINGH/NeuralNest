from langchain_community.document_loaders import PyMuPDFLoader
from langchain.chains import LLMChain
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import HuggingFaceHub
from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain.chains import RetrievalQA
from langchain_community.llms import GPT4All,LlamaCpp
from langchain.prompts import PromptTemplate
from langchain_community.vectorstores import Chroma
import chromadb
import warnings
warnings.filterwarnings('ignore', category=UserWarning, message='TypedStorage is deprecated')

import json
import os
import time
from dotenv import load_dotenv

load_dotenv()

HUGGINGFACEHUB_API_TOKEN = os.environ.get('HUGGINGFACEHUB_API_TOKEN')


# Reading the PDF
loader = PyMuPDFLoader("../uploaded_files/eedb59e.pdf")
data = loader.load()

# Splitting the text
chunk_size = 250
chunk_overlap = 30
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=chunk_size, chunk_overlap=chunk_overlap
)

splits = text_splitter.split_documents(data)
        
# creating the Embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
result_embeddings = []

# check if DB exists => yes then append to it : no then create a new DB

client = chromadb.PersistentClient(path="db")

# collection = client.create_collection(name="personal_data")

# client.add_documents(splits)

db = Chroma.from_documents(
    documents=splits ,
    embedding=embeddings, 
    persist_directory="db", 
    collection_name="personal_data" 
)
retriever = db.as_retriever(search_kwargs={"k":4})
db.persist()

# get an existing collection
collection = client.get_collection("personal_data")

# print("client",collection)

callbacks = [StreamingStdOutCallbackHandler()]

llm = GPT4All( model="../llm_models/gpt4all-falcon-newbpe-q4_0.gguf",
                      max_tokens=1000, 
                    #   backend='gptj', 
                      n_batch=8, 
                      callbacks=callbacks,
                      verbose=True)

repo_id = "google/flan-t5-xxl"
question = "Who is Niku SIngh from India? "

template = """Question: {question}

Answer: Let's think step by step."""

prompt = PromptTemplate(template=template, input_variables=["question"])

# llm = HuggingFaceHub(
#     repo_id=repo_id, model_kwargs={"temperature": 0.5, "max_length": 64}
# )

qa = RetrievalQA.from_chain_type(llm=llm, 
                                 chain_type="stuff", 
                                 retriever=retriever, 
                                 return_source_documents=True,
                                 verbose=True,
                                 )

# llm_chain = LLMChain(prompt=prompt, llm=llm)


print("Embeddings",embeddings)
# print(llm_chain.invoke(question))
print("Final anser",qa("List Nikus work exp?"))

# print("collection", json.dumps(results,indent=2, sort_keys=True))
# loader = PyPDFLoader("example_data/layout-parser-paper.pdf")