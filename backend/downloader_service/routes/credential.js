const env = require("../env").default
let Credential = {
    accessKeyId : env.AWS_ACCESS_KEY_ID,
    secretAccessKey : env.AWS_SECRET_ACCESS_KEY
};
module.exports = {Credential};
