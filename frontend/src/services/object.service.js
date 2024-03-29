import axios from "axios";
import api from "../api"

class ObjectService {
    get(_bucketName, user="") {
        return axios.get(api.object + "/getObjects" + _bucketName );
    }
}

export default new ObjectService();
