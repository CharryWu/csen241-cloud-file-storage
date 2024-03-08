import asyncio
import logging
from urllib.parse import quote as urlencode
from functools import cache

import boto3
from .main import CloudUpload, FileData, UploadFile

logger = logging.getLogger(__name__)


class S3(CloudUpload):
    @property
    @cache
    def client(self):
        aws_access_key_id = ""
        aws_secret_access_key = ""
        aws_region_name = "us-west-1"   
        return boto3.client('s3', region_name=aws_region_name, aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)

    async def upload(self, *, file: UploadFile) -> FileData:
        try:
            extra_args = self.config.get('extra_args', {})
            bucket = "bucketforcsen241"
            region = "us-west-1"
            await asyncio.to_thread(self.client.upload_fileobj, file.file, bucket, file.filename, ExtraArgs=extra_args)
            url = f"https://{bucket}.s3.{region}.amazonaws.com/{urlencode(file.filename.encode('utf8'))}"
            return FileData(url=url, message=f'{file.filename} uploaded successfully', filename=file.filename,
                            content_type=file.content_type, size=file.size)
        except Exception as err:
            logger.error(err)
            return FileData(status=False, error=str(err), message='File upload was unsuccessful')

    async def multi_upload(self, *, files: list[UploadFile]):
        tasks = [asyncio.create_task(self.upload(file=file)) for file in files]
        return await asyncio.gather(*tasks)
