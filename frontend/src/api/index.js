export default {
    bucket: `http://${process.env.REACT_APP_DOWNLOADER_BACKEND_HOST}:${process.env.REACT_APP_DOWNLOADER_BACKEND_PORT}/api/bucket`,
    bucket_create: `http://${process.env.REACT_APP_UPLOADER_BACKEND_HOST}:${process.env.REACT_APP_UPLOADER_BACKEND_PORT}/api/create/s3/bucket`,
    download: `http://${process.env.REACT_APP_DOWNLOADER_BACKEND_HOST}:${process.env.REACT_APP_DOWNLOADER_BACKEND_PORT}/api/download`,
    upload: `http://${process.env.REACT_APP_UPLOADER_BACKEND_HOST}:${process.env.REACT_APP_UPLOADER_BACKEND_PORT}/api/upload`,
    object: `http://${process.env.REACT_APP_DOWNLOADER_BACKEND_HOST}:${process.env.REACT_APP_DOWNLOADER_BACKEND_PORT}/api/object`,
}
