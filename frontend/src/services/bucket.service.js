import axios from "axios";
import api from "../api"
import userPool from "../components/auth/cognitopool";

class BucketService {
    async get() {

        const cognitoUser = userPool.getCurrentUser()
        const accessToken = await cognitoUser.getSession(function (err, session) {
            return new Promise((res, rej) => res(session.accessToken.jwtToken))
        });

        return axios.post(api.bucket + "/getBuckets", {
            accessToken
        });
    }

    async createBucket(bucketName){

        return axios.get(api.bucket_create + "/" + bucketName);
    }
}

export default new BucketService();
