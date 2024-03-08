from fastapi import FastAPI, Request, Depends
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

from fastfiles import S3, FileData

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

