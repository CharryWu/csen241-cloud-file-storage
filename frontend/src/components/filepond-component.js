import uploadService from '../services/upload.service';
import api from '../api'
// Import FilePond styles
import React, { useState, useEffect } from "react";

// Import React FilePond
import { FilePond, File, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";


// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform
);

export default function FilePondComponent() {
    const [files, setFiles] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    // console.log("files", files);
    let pond = null;
  
    const onSubmit = (e) => {
        console.log("pond", pond);
        console.log("files", files);
        
        let pond_files = pond.getFiles()
        pond_files.forEach((file)=>{
            console.log(file)
            uploadService.post("file", file.file, api.upload + '/s3')
            .then((res)=>{
                console.log(res)
            }).catch((err)=>{
                window.alert(err)
            })
        })
        
       /*
      if (pond) {
        let pond_files = pond.getFiles();
        pond_files.forEach((file) => {
            console.log("each file", file, file.getFileEncodeBase64String());
        });
  
        pond
          .processFiles(pond_files)
          .then((res) => console.log(res))
          .catch((error) => console.log("err", error));
      }*/
      
    };
    const handlePondFile = (error, file) => {
        if (error) {
            console.log('Oh no');
            console.log(error)
            return;
        }
        console.log('File added', file);
    }
  
    return (
        <div className='container'>

            <FilePond
            server={{
                process:{
                    url:api.upload + '/s3',
                    method: 'POST',
                    onerror: setErrorMsg
                }
            }}
            files={files}
            ref={(ref) => {
                pond = ref;
            }}
            required
            acceptedFileTypes={["application/pdf", "image/*"]}
            allowFileEncode
            allowImageTransform
            imagePreviewHeight={400}
            imageCropAspectRatio={"1:1"}
            imageResizeTargetWidth={100}
            imageResizeTargetHeight={100}
            imageResizeMode={"cover"}
            imageTransformOutputQuality={50}
            imageTransformOutputQualityMode="optional"
            onpreparefile={handlePondFile}
            onupdatefiles={(fileItems) => {
                // Set current file objects to this.state
                setFiles(
                    fileItems.map((fileItem) => fileItem.file),
                );
            }}
            instantUpload={false}
            allowMultiple={true}
            maxFiles={5}
            
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            labelFileProcessingError={errorMsg}
            />
            <div>
                    <button onClick={onSubmit} className="btn btn-primary">
                        <span>UPLOAD</span>
                    </button>
            </div>
            
        </div>
    );
  }
  