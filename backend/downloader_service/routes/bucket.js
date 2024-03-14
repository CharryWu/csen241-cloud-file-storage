const router = require("express").Router();
var AWS = require("aws-sdk");
const { Credential } = require('./credential.js');
const { listUsers, getUserAttributes } = require('../utils/users.js');
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

router.get("/getBuckets", async (req, res) => {
    console.log(req.params)

    const users = await listUsers('us-west-1_VazaBYCXb');
    let data = await s3.listBuckets().promise();
    console.log(users)
    console.log(data)
    if(users.Users){
        users.Users.forEach((user)=>{

        })
    }

    return res.status(200).send(data);
});

router.post("/getBuckets", async (req, res) => {
    const { accessToken } = req.body;
    let result = await getUserAttributes(accessToken)

    let cognitoUserIDAttribute = result.UserAttributes.find(x => x.Name === 'sub' && x.Value !== '')
    console.log(cognitoUserIDAttribute)
    // get s3 buckets
    let bucketData = null
    if (cognitoUserIDAttribute) {
        let userCognitoID = cognitoUserIDAttribute.Value
        let buckets = await s3.listBuckets().promise();
        bucketData = buckets.Buckets.find(x => x.Name === userCognitoID)
    }

    return res.status(200).send(bucketData);
});

module.exports = router;
