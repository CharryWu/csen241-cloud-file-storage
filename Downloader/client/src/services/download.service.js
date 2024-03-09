import axios from "axios";
// const API_URL = "http://localhost:8081/api/download";
const API_URL = "http://3.145.166.223:8081/api/download";

class DownloadService {
    get(bucketName, objectName) {
        return axios.get(API_URL + "/get", {
            params: {
                bucket: bucketName,
                object: objectName
            }
        });
    }
}

export default new DownloadService();