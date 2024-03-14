import axios from "axios";
class UploadService {
    post(inputName, file, url) {
        let formData = new FormData();
        formData.append(inputName, file)
        console.log(formData.get(inputName))
        return axios.post(url,
            formData,
            {
              headers: {
                'content-type': 'multipart/form-data',
              },
            }
        );
    }
}

export default new UploadService();
