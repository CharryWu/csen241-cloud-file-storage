import axios from "axios";
import api from "../api"

class DownloadService {
    get(bucketName, objectName) {
        return axios.get(api.download + "/get", {
            params: {
                bucket: bucketName,
                object: objectName
            }
        });
    }
}

export default new DownloadService();
