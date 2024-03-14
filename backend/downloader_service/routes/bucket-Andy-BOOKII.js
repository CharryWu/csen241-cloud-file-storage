const router = require("express").Router();
var AWS = require("aws-sdk");
const { Credential } = require('./credential.js');

AWS.config.update({
    accessKeyId: Credential.accessKeyId,
    secretAccessKey: Credential.secretAccessKey
});

let s3 = new AWS.S3({signatureVersion: 'v4', region: Credential.region});

router.use((req, res, next) => {
    console.log("This is router bucket speaking...")
    next();
});

router.get("/getBuckets", async (req, res) => {
    const data = await s3.listBuckets().promise();
    console.log(data)
    return res.status(200).send(data);
});

module.exports = router;