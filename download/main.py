import boto3

aws_access_key_id = ""
aws_secret_access_key = ""
aws_region_name = "us-west-1"
bucket_name = "csen241-file"


s3 = boto3.resource(service_name='s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key, region_name=aws_region_name)

for bucket in s3.buckets.all():
    print(bucket.name)

for page in s3.Bucket(bucket_name).objects.pages():
    for obj in page:
        print(obj.key)
        # s3.Bucket(bucket_name).download_file(obj.key, './' + obj.key)