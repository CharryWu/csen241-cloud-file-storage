const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "ENTER YOUR accessKeyId",
    secretAccessKey: "ENTER YOUR secretAccessKey",
});

const BUCKET_NAME = 'random-name-bucket-234389'

const createBucket = (bucketName) => {
    // Create the parameters for calling createBucket
    var bucketParams = {
        Bucket : bucketName
    };
  
    // call S3 to create the bucket
    s3.createBucket(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Location);
        }
    });
}

const listBuckets = (s3) => {
    s3.listBuckets(function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Buckets);
        }
    });
}

const uploadFile = (filePath,bucketName,keyName) => {
    var fs = require('fs');
    // Read the file
    const file = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    const uploadParams = {
        Bucket: bucketName, // Bucket into which you want to upload file
        Key: keyName, // Name by which you want to save it
        Body: file // Local file 
    };

    s3.upload(uploadParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } 
        if (data) {
            console.log("Upload Success", data.Location);
        }
    });
};

const listObjectsInBucket = (bucketName) => {
    // Create the parameters for calling listObjects
    var bucketParams = {
        Bucket : bucketName,
    };
  
    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}

const deleteBucket = (bucketName) => {
    // Create params for S3.deleteBucket
    var bucketParams = {
        Bucket : bucketName
    };
  
    // Call S3 to delete the bucket
    s3.deleteBucket(bucketParams, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}