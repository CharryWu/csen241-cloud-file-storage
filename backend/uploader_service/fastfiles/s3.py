import asyncio
import logging
from urllib.parse import quote as urlencode
from functools import cache, lru_cache

import boto3
from .main import CloudUpload, FileData, UploadFile
import os
logger = logging.getLogger(__name__)
from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv("../../.env"))

print(os.environ.get("AWS_ACCESS_KEY_ID", ""))
print(os.environ.get("AWS_SECRET_ACCESS_KEY", ""))
class S3(CloudUpload):
    @property
    @cache
    def client(self):
        aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID", "")
        aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY", "")
        region_name = os.environ.get("UPLOAD_DEFAULT_REGION", "")
        return boto3.client('s3', region_name=region_name, aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)

    async def upload(self, *, file: UploadFile) -> FileData:
        try:
            extra_args = self.config.get('extra_args', {})
            region_name = os.environ.get("UPLOAD_DEFAULT_REGION", "")
            bucket = os.environ.get("UPLOAD_DEFAULT_BUCKET", "")
            print("files:",file)
            await asyncio.to_thread(self.client.upload_fileobj, file.file, bucket, file.filename, ExtraArgs=extra_args)
            url = f"https://{bucket}.s3.{region_name}.amazonaws.com/{urlencode(file.filename.encode('utf8'))}"
            return FileData(url=url, message=f'{file.filename} uploaded successfully', filename=file.filename,
                            content_type=file.content_type, size=file.size)
        except Exception as err:
            logger.error(err)
            return FileData(status=False, error=str(err), message='File upload was unsuccessful')

    async def multi_upload(self, *, files: list[UploadFile]) -> list[FileData]:
        tasks = [asyncio.create_task(self.upload(file=file)) for file in files]
        return await asyncio.gather(*tasks)
