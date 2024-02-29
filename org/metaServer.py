from fastapi import FastAPI
import json 
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

@app.post("/receive_data")
async def receive_data(request: Request):
    # Process received data
    print("@@@@@@@@@@")
    employee_dict = request.body()
    print(employee_dict)
    print(employee_dict['id'])

    print("Converted to Python", type(employee_dict)) 
    print(employee_dict) 
    print(f"Received data: {employee_dict}")
    return {"message": "Data received successfully"}

# define a homepage
@app.get("/")
async def homepage():
    return {"message": "Hello World"}

# Run the server
'''
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("metaServer:app", host="127.0.0.1", port = 8011)
'''