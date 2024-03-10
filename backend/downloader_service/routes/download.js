const router = require("express").Router();
var AWS = require("aws-sdk");
const { Credential } = require('./credential.js');

AWS.config.update({
    accessKeyId: Credential.accessKeyId,
    secretAccessKey: Credential.secretAccessKey
});

let s3 = new AWS.S3({signatureVersion: 'v4', region: 'us-west-1'});

router.use((req, res, next) => {
    console.log("This is router download speaking...")
    next();
});

router.get("/get", async (req, res) => {
    let { bucket, object } = req.query;

    const signedUrlExpireSeconds = 60 * 5;

    const url = s3.getSignedUrl('getObject', {
        Bucket: bucket,
        Key: object,
        Expires: signedUrlExpireSeconds
    })
    console.log(url);
    return res.status(200).send(url);
});

module.exports = router;