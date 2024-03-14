import uploadService from '../services/upload.service';
import api from '../api'
import AlertDismissible from './alert-component';
import UploadButton from './button-component';
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

export default function FilePondComponent({ bucketName, emit }) {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('Loading ...');
    const [alertType, setAlertType] = useState('info');
    const [isToggled, setIsToggled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    // console.log("files", files);
    let pond = null;

    const onSubmit = (e) => {
        console.log("pond", pond);
        console.log("files", files);
        if (files.length === 0) {
            return;
        }
        setIsLoading(true);
        let pond_files = pond.getFiles()
        let counter = 0;
        pond_files.forEach((file) => {
            console.log(file)
            setIsLoading(true);
            uploadService.post("file", file.file, api.upload + '/s3/' + bucketName)
                .then((res) => {
                    console.log(res)
                    setTitle('Oh yeah! Your request is successful!')
                    setAlertType('success')
                    setErrorMsg(alertType + ' | ' + res.status + ' : ' + res.data.filename + ' uploaded successfully!')
                    setIsLoading(false);
                    counter++;

                    if (counter === pond_files.length) {
                        emit('upload_success');
                    }
                }).catch((err) => {
                    //window.alert(err)
                    setTitle('Oh snap! You got an error!')
                    setAlertType('danger')
                    setErrorMsg(alertType + ' : ' + err + ' --- server not available, try again later ...')
                    setIsLoading(false);
                })
        })
        setIsToggled(true)

    };
    const handlePondFile = (error, file) => {
        if (error) {
            console.log('Oh no');
            console.log(error)
            return;
        }
        console.log('File added', file);
    }

    const handleAlert = () => {
        setTitle('Loading...')
        setIsToggled(false);
        setAlertType('info')
        setErrorMsg('...')
    }

    return (
        <div className=''>
            <AlertDismissible type={alertType} showing={isToggled} title={title} msg={errorMsg} onX={handleAlert} />
            <FilePond
                server={{
                    process: {
                        url: api.upload + '/s3',
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
                <UploadButton disabled={files.length === 0} isLoading={isLoading} onSubmit={onSubmit} />
            </div>

        </div>
    );
}
