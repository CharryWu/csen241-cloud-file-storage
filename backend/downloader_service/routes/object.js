const router = require("express").Router();
var AWS = require("aws-sdk");
const { Credential } = require('./credential.js');

AWS.config.update({
    accessKeyId: Credential.accessKeyId,
    secretAccessKey: Credential.secretAccessKey
});

let s3 = new AWS.S3({signatureVersion: 'v4', region: 'us-west-1'});

router.use((req, res, next) => {
    console.log("This is router object speaking...")
    next();
});

router.get("/getObjects:bucketName", async (req, res) => {
    let { bucketName } = req.params;

    const params = {
        Bucket: bucketName,
        Delimiter: '/',
        Prefix: ''
    };
    
    const data = await s3.listObjects(params).promise();

    return res.status(200).send(data);
});

module.exports = router;