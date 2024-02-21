from fastapi import FastAPI, UploadFile, Form, HTTPAuthorizationCredentials, Security, Response, Request, Depends, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import time
from datetime import datetime
import oci
from pydantic import BaseModel

app = FastAPI()


@app.post("/file_uploading")
async def upload_file(
    header_request: Request,
    header_response: Response,
    files: list[UploadFile],
    fund_id: str = Form(...),
    snap_shot_date: str = Form(...),
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db),
):
    # Function implementation



# Inside upload_file function
try:
    fund_id = int(fund_id)
except Exception as e:
    # Handle invalid Fund ID
    header_response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
    response = await getResponse(x_transaction, True, "Invalid Fund ID")
    return response

try:
    date = datetime.strptime(snap_shot_date, '%Y-%m-%d')
    if snap_shot_date == "":
        # Handle missing Snapshot Date
        header_response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        response = await getResponse(x_transaction, True, "Fund ID not found")
        return response
except Exception as e:
    # Handle invalid date format
    header_response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
    response = await getResponse(x_transaction, True, "Invalid Date Format")
    return response



# Inside upload_file function
configuration = {
    "user": config("USER_OCID"),
    "key_file": config("PRIVATE_KEY_FILE_PATH"),
    "fingerprint": config("FINGER_PRINT"),
    "tenancy": config("TENANCY"),
    "region": config("REGION")
}

object_storage_client = oci.object_storage.ObjectStorageClient(configuration)
namespace = config("NAMESPACE")
bucket_name = config("BUCKET_NAME")

for file in files:
    # Generate a unique filename and create the object name
    fileName = file.filename.split(".")[0] + "_" + str(round(time.time() * 1000)) + "." + file.filename.split(".")[-1]
    object_name = "inteliport_media/top_10_holding/" + str(datetime.now().date()) + "/" + fileName

    # Upload the file to OCI object storage bucket
    storing_path_in_Database = object_name.split("top_10_holding")[-1]
    object_storage_client.put_object(namespace, bucket_name, object_name, file.file)



# Inside upload_file function
file_path_String = ""
for file in files:
    # ... (Same loop as before)
    file_path_String = file_path_String + storing_path_in_Database + ","
# ... (Rest of the function)

# Store the file paths in the database
for data_qc_top_10_holding in add_apth.all():
    data_qc_top_10_holding.DOCUMENT_PATH = file_path_String
    db.add(data_qc_top_10_holding)

db.commit()
response = await getResponse(x_transaction, True, "File Uploaded Successfully")
return response



@app.post("/download-file")
async def download_file(
    response: Response, request: file_name_schema, header_request: Request, credentials: HTTPAuthorizationCredentials = Security(security), db: Session = Depends(get_db)
):
    # Function implementation
