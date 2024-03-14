import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import ObjectService from "../services/object.service";
import BucketService from "../services/bucket.service";
import DownloadService from "../services/download.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import FilePondComponent from "./filepond-component";
import { IoMdCloudUpload, IoMdDownload } from "react-icons/io";
import { humanReadableFileSize } from '../utils'


const ObjectComponent = () => {
    let [bucketName, setBucketName] = useState(null);
    let [objectData, setObjectData] = useState(null);
    let [bucketData, setBucketData] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate()

    const refreshObjects = (bucketName) => {
        ObjectService.get(bucketName)
        .then((res) => {
            setObjectData(res.data['Contents']);
        })
        .catch((e) => {
            window.alert(e);
        });
    }

    useEffect(() => {
        if (userData.name == "") {
            navigate("/login")
            return
        }
        BucketService.get()
            .then((res) => {
                setBucketData(res.data);
                if (res.data['Name']) {
                    setBucketName(res.data['Name'])
                    refreshObjects(res.data['Name'])
                }
            })
            .catch((e) => {
                window.alert(e);
            });
    }, []);
    const onDownload = (bucketName, objectName) => {
        DownloadService.get(bucketName, objectName)
            .then((res) => {
                window.open(res.data);
            })
            .catch((e) => {
                window.alert(e);
            });
    }

    const onEventReceived = (event_name) => {
        if (event_name === 'upload_success') {
            handleClose()
            refreshObjects(bucketName)
        }
    }

    const renderUploadModal = () => {
        return <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload New File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FilePondComponent bucketName={bucketName} emit={onEventReceived} />
                </Modal.Body>
            </Modal>
        </>
    }

    return (
        <div style={{ padding: "3rem" }} className="col-md-12">
            <div>
                <h3>Your Bucket:</h3>
                <div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>CreationDate</th>
                                <th>Upload</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bucketData && (
                                <tr>
                                    <td>{bucketData["Name"]}</td>
                                    <td>{bucketData["CreationDate"]}</td>
                                    <td>
                                        <Button type="primary" onClick={handleShow} active style={{ width: 50 }}>
                                            <IoMdCloudUpload />
                                        </Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
            <h3>Files:</h3>
            <div>
                <div>
                    <Table striped bordered hover>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>LastModified</th>
                            <th>Download</th>
                        </tr>
                        {objectData && objectData.map((object) => (
                            <tr>
                                <td>{object["Key"]}</td>
                                <td>{humanReadableFileSize(object["Size"])}</td>
                                <td>{object["LastModified"]}</td>
                                <td>
                                    <Button type="primary" onClick={
                                        () => onDownload(bucketName, object["Key"])
                                    } active style={{ width: 50 }}>
                                        <IoMdDownload />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>
            </div>
            {renderUploadModal()}
        </div>
    );
};

export default ObjectComponent;
