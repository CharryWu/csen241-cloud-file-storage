import axios from "axios";
// const API_URL = "http://localhost:8081/api/object";
const API_URL = "http://3.145.166.223:8081/api/object";

class ObjectService {
    get(_bucketName) {
        return axios.get(API_URL + "/getObjects" + _bucketName);
    }
}

export default new ObjectService();