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

  return {"message": "File uploaded successfully!"}