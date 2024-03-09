import axios from "axios";
// const API_URL = "http://localhost:8081/api/bucket";
const API_URL = "http://3.145.166.223:8081/api/bucket";

class BucketService {
    get() {
        return axios.get(API_URL + "/getBuckets");
    }
}

export default new BucketService();