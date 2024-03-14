import axios from "axios";
import api from "../api"

class BucketService {
    get(user="") {
        return axios.post(api.bucket + "/getBuckets", );
    }
}

export default new BucketService();
