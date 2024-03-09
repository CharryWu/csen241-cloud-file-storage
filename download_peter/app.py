from fastapi import FastAPI, Request, Depends
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

from fastfiles import S3, FileData

from uuid import uuid4

import boto3
from botocore.exceptions import ClientError
import magic
import uvicorn
from fastapi import FastAPI, HTTPException, Response, UploadFile, status
from loguru import logger

#predefine fubnction
async def s3_download(key: str):
    try:
        return s3.Object(bucket_name=AWS_BUCKET, key=key).get()['Body'].read()
    except ClientError as err:
        logger.error(str(err))

'''
original part
'''

load_dotenv()
app = FastAPI()
templates = Jinja2Templates(directory='.')

s3 = S3(config={'extra-args': {'ACL': 'public-read'}})


@app.get('/')
async def home(req: Request):
    return templates.TemplateResponse('home.html', {'request': req})

@app.post('/s3_upload', name='s3_upload')
async def upload(file: FileData = Depends(s3)) -> FileData:
    return file

from starlette.responses import FileResponse
@app.get("/shows/")
async def shows(req: Request):
    #get file lists
    import boto3

    aws_access_key_id     = "AKIAZTQYJQ64KUO5L2BL"
    aws_secret_access_key = "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"
    aws_region_name       = "us-west-1"
    bucket_name           = "csen241-file"

    s3 = boto3.resource(service_name='s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key, region_name=aws_region_name)

    for bucket in s3.buckets.all():
        print(bucket.name)

    lists = []
    for page in s3.Bucket(bucket_name).objects.pages():
        for obj in page:
            lists.append(obj.key) 
            print(obj.key)
            # s3.Bucket(bucket_name).download_file(obj.key, './' + obj.key)
    
    return templates.TemplateResponse('lists.html', {'request': req, 'list': lists})


@app.get('/download/{file_name}')
async def download(file_name: str | None = None):
    if not file_name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='No file name provided')

    contents = await s3_download(key=file_name)
    return Response(
        content=contents,
        headers={
            'Content-Disposition': f'attachment;filename={file_name}',
            'Content-Type': 'application/octet-stream',
        }
    )
