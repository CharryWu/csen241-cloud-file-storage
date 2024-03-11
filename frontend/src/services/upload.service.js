import axios from "axios";
import api from "../api"

const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  
class UploadService {
    post(inputName, file, url) {
        let formData = new FormData();
        formData.append(inputName, file)
        console.log(formData.get(inputName))
        return axios.post(url, 
            formData,
            config
        );
    }
}

export default new UploadService();