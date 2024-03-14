from fastapi import FastAPI, Request, Depends, File, UploadFile
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastfiles import S3, FileData
import os
import json
import boto3
from pydantic import BaseModel
import uvicorn
import json


load_dotenv()
app = FastAPI()
templates = Jinja2Templates(directory='.')

s3 = S3(config={'extra-args': {'ACL': 'public-read'}})
backend_host = os.environ.get("UPLOADER_BACKEND_HOST")
backend_port = int(os.environ.get("UPLOADER_BACKEND_PORT"))
print("port: ", backend_port)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    print("in upload...")
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
class SharePostParamInput(BaseModel):
    targetUser: str
    bucketName: str
    objectName: str

class ShareGetParamInput(BaseModel):
    targetUser: str

FILE_NAME = 'share.json'

@app.post('/api/share', name='share_post')
async def share(params: SharePostParamInput):
    data = {}
    if os.path.exists(FILE_NAME) and os.path.isfile(FILE_NAME):
        with open(FILE_NAME, "r") as jsonFile:
            data = json.load(jsonFile)

    if params.targetUser not in data:
        data[params.targetUser] = [(params.bucketName, params.objectName)]
    else:

        data[params.targetUser].append((params.bucketName, params.objectName))

    with open("share.json", "w+") as jsonFile:
        json.dump(data, jsonFile)

    return {
        'status': 0,
    }

@app.post('/api/share_get', name='share_get')
async def share_get(params: ShareGetParamInput):
    data = {}
    files = []
    targetUser = params.targetUser
    if os.path.exists(FILE_NAME) and os.path.isfile(FILE_NAME):
        with open(FILE_NAME, "r") as jsonFile:
            data = json.load(jsonFile)
    print(data)

    if targetUser in data:
        files = data[targetUser]


    return {
        'status': 0,
        'files': files
    }
if __name__ == "__main__":
    uvicorn.run("app:app", host=backend_host, port=backend_port, log_level="info", reload=True)


