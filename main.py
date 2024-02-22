from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, UploadFile, File, HTTPException
from starlette.responses import StreamingResponse
from fastapi import FastAPI, UploadFile, Response, File
from starlette.responses import StreamingResponse
from fastapi import FastAPI, Depends, templating
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json 

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# define an app
app = FastAPI()

# define static and template page
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# define a homepage
@app.get("/")
async def homepage(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")


@app.get("/upload", response_class=HTMLResponse)
async def upload(request: Request):
    return templates.TemplateResponse(request=request, name="upload.html")


@app.get("/download", response_class=HTMLResponse)
async def download(request: Request):
    return templates.TemplateResponse(request=request, name="download.html")


# Data structure to store uploaded files (replace with database or desired method)
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Validate and save file
    # ...

    # Update uploaded_files data structure
    # ...

    #Test
    send_data()

    #Return value
    return {"message": "File uploaded successfully!"}


from fastapi import FastAPI, Body, HTTPException
import requests
def send_data():
    url = "http://0.0.0.0:8010/receive_data"
    #response = requests.post(url, data={'id': 123456789, 'key1':'value1', 'key2':'value2'})
    response = requests.post(url, json={'id': 1, 'name': 'Jessa'})

    if response.status_code == 200:
        return {"message": "Data sent successfully"}
    
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    #uvicorn main:app --reload