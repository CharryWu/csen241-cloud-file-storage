import axios from "axios";
import api from "../api"

class BucketService {
    get(user="") {
        return axios.get(api.bucket + "/getBuckets" +user);
    }
}

export default new BucketService();
