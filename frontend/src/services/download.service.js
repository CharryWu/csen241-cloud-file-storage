import axios from "axios";
import api from "../api"

class DownloadService {
    get(bucketName, objectName, user="") {
        return axios.get(api.download + "/get" + user, {
            params: {
                bucket: bucketName,
                object: objectName
            }
        });
    }
}

export default new DownloadService();
