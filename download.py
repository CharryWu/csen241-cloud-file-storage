from fastapi import FastAPI, UploadFile, Form, HTTPAuthorizationCredentials, Security, Response, Request, Depends, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
import time
from datetime import datetime
import oci
from pydantic import BaseModel


# Inside download_file function
configuration = 
{
    "user":         config("USER_OCID"),
    "key_file":     config("PRIVATE_KEY_FILE_PATH"),
    "fingerprint":  config("FINGER_PRINT"),
    "tenancy":      config("TENANCY"),
    "region":       config("REGION")
}

x_transaction = header_request.headers.get("x-transaction-ref")
object_storage_client = oci.object_storage.ObjectStorageClient(configuration)

# Set up bucket information
namespace   = config("NAMESPACE")
bucket_name = config("BUCKET_NAME")
object_name = "inteliport_media/top_10_holding" + request.file_name

# Download the file
try:
    object = object_storage_client.get_object(namespace, bucket_name, object_name)
except:
    # Handle file not found
    response.status_code = status.HTTP_404_NOT_FOUND
    return await getResponse(x_transaction, False, "File Not Found")

file_content = object.data.content
file = io.BytesIO(file_content)
response.headers["Content-Disposition"] = f"attachment; filename={object_name}"
response.headers["Content-Type"] = "application/octet-stream"
return StreamingResponse(file, media_type="application/octet-stream")