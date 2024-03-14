from fastapi import FastAPI, Request, Depends, File, UploadFile
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastfiles import S3, FileData
import os
import json
import uvicorn

load_dotenv()
app = FastAPI()
templates = Jinja2Templates(directory='.')

s3 = S3(config={'extra-args': {'ACL': 'public-read'}})
backend_host = os.environ.get("UPLOADER_BACKEND_HOST")
backend_port = int(os.environ.get("UPLOADER_BACKEND_PORT"))
print("port: ", backend_port)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:" + os.environ.get("REACT_FRONTEND_PORT"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def home(req: Request):
    print(req.headers)

    return templates.TemplateResponse('home.html', {'request': req})


@app.post('/api/upload/s3/{bucketName}', name='s3_upload')
async def upload(bucketName, file: FileData = Depends(s3)) -> FileData:
    print(bucketName, file)
    # s3.client()
    # s3.upload(bucketName, file)
    return file
'''
@app.post('/api/upload/{storage_type}', name="s3_upload")
async def upload(storage_type: str, request: Request, files: list[FileData] = Depends(s3),) -> list[FileData]:
    print(storage_type)
    print(request)
    print(files)
    return files
'''

if __name__ == "__main__":
    uvicorn.run("app:app", host=backend_host, port=backend_port, log_level="info", reload=True)


