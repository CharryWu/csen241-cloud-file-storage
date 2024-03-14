const router = require("express").Router();
var AWS = require("aws-sdk");
const { Credential } = require('./credential.js');
const listUsers = require('../utils/users.js');

AWS.config.update({
    accessKeyId: Credential.accessKeyId,
    secretAccessKey: Credential.secretAccessKey,
    region: Credential.region
});

let s3 = new AWS.S3({signatureVersion: 'v4', region: Credential.region});

router.use((req, res, next) => {
    console.log("This is router bucket speaking...")
    next();
});

router.get("/getBuckets/:user", async (req, res) => {
    console.log(req.params)
    const users = await listUsers('us-west-1_VazaBYCXb');
    let data = await s3.listBuckets().promise();
    console.log(users)
    if(users.Users){
        users.Users.forEach((user)=>{

        })
    }
    
    
    return res.status(200).send(data);
});

module.exports = router;