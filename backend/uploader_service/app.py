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
import uvicorn

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

@app.post('/api/create/s3/bucket/{bucketName}', name="s3_create_buck")
async def upload(bucketName: str):
    print("bucketname ", bucketName)
    region_name = os.environ.get("UPLOAD_DEFAULT_REGION", "")
    print("region ", region_name)
    item = {}
    try:
        s3_client = client()
        s3_client.create_bucket(
            Bucket = bucketName
        )
        print(f"S3 bucket '{bucketName}' created successfully in region {region_name}.")
        item['msg'] = f"S3 bucket '{bucketName}' created successfully in region {region_name}."
    except Exception as e:
        print(f"An error occurred while creating the S3 bucket: {e}")
        item['msg'] = f"An error occurred while creating the S3 bucket: {e}"
        
    
    json_compatible_item_data = jsonable_encoder(item)
    return JSONResponse(content=json_compatible_item_data)
        
def client() -> boto3.session.Session.client:
    aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID", "")
    aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY", "")
    region_name = os.environ.get("UPLOAD_DEFAULT_REGION", "")
    return boto3.client('s3', region_name=region_name, aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
    


if __name__ == "__main__":
    uvicorn.run("app:app", host=backend_host, port=backend_port, log_level="info", reload=True)


