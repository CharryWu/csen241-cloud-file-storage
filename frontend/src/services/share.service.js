import axios from "axios";
import api from "../api"
import userPool from "../components/auth/cognitopool";

class ShareService {
    async getUsers() {
        return axios.get(api.bucket + "/getUsers");
    }
    async post(targetUser, bucketName, objectName) {

        return axios.post(api.share, {
            targetUser, bucketName, objectName
        });
    }
    async get(targetUser) {

        return axios.post(api.share_get, {
            targetUser
        });
    }
}

export default new ShareService();
