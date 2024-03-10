import axios from "axios";
import api from "../api"

class BucketService {
    get() {
        return axios.get(api.bucket + "/getBuckets");
    }
}

export default new BucketService();
