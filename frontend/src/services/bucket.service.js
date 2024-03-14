import axios from "axios";
import api from "../api"
import userPool from "../components/auth/cognitopool";
import cognito from '../api/cognito'

class BucketService {
    async get() {

        const cognitoUser = userPool.getCurrentUser()
        const accessToken = await cognitoUser.getSession(function (err, session) {
            console.log(session);
            console.log(session.accessToken.jwtToken)
            return new Promise((res, rej) => res(session.accessToken.jwtToken))
        });
        //const allUser = userPool.get

        console.log(accessToken)

        return axios.post(api.bucket + "/getBuckets", {
            accessToken
        });
    }
}

export default new BucketService();
