import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import ObjectService from "../services/object.service";
import BucketService from "../services/bucket.service";
import DownloadService from "../services/download.service";
import ShareService from "../services/share.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userPool from "./auth/cognitopool";
import Form from 'react-bootstrap/Form';

import Modal from 'react-bootstrap/Modal';
import FilePondComponent from "./filepond-component";
import { IoMdCloudUpload, IoMdDownload, IoMdShare } from "react-icons/io";
import { humanReadableFileSize } from '../utils'


const ObjectComponent = () => {
    let [bucketName, setBucketName] = useState(null);
    let [objectData, setObjectData] = useState(null);
    let [sharedObjectData, setSharedObjectData] = useState(null);
    let [bucketData, setBucketData] = useState(null);
    let [listUserData, setListUserData] = useState([]);
    let [selectedShareUser, setSelectedShareUser] = useState(null);
    let [shareBucket, setShareBucket] = useState(null);
    let [shareObjectName, setShareObjectName] = useState(null);
    const [show, setShow] = useState(false);
    const [showShare, setShowShareModal] = useState(false);
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
        BucketService.post()
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

        const currentUser = userPool.getCurrentUser()
        if (!currentUser.username) return
        ShareService.get(currentUser.username)
            .then((res) => {
                console.log(res)
                setSharedObjectData(res.data.files);
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
    const onShare = async (bucketName, objectName) => {
        ShareService.getUsers().then((res) => {
            const currentUser = userPool.getCurrentUser()
            console.log(currentUser)
            let ll = res.data?.Users?.filter(x => x.Username !== currentUser.username)
            if (ll && ll.length > 0) {
                setListUserData(ll)
                setShowShareModal(true)
                console.log(ll)
                setSelectedShareUser(ll[0].Username)
                setShareBucket(bucketName)
                setShareObjectName(objectName)
            }
        })
    }
    const handleShare = async () => {
        console.log(shareBucket, shareObjectName, selectedShareUser)
        if (shareBucket && shareObjectName && selectedShareUser) {
            ShareService.post(selectedShareUser, bucketName, shareObjectName).then(res => {
                setShowShareModal(false)
            })
        }
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
                    <Modal.Title>Select User to Share</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FilePondComponent bucketName={bucketName} emit={onEventReceived} />
                </Modal.Body>
            </Modal>
        </>
    }
    const handleCloseShareModal = () => setShowShareModal(false)
    const updateSharedUser = (e) => {
        setSelectedShareUser(e.target.value)
    }
    const renderShareModal = () => {
        return <>
            <Modal show={showShare} onHide={handleCloseShareModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Share File with User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Select onChange={updateSharedUser} aria-label="Default select example">
                    {
                        listUserData.map(u => <option value={u.Username}>{u.Username}</option>)
                    }
                </Form.Select>
                </Modal.Body>
                <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseShareModal}>
            Close
          </Button>
          <Button disabled={!shareBucket || !shareObjectName} variant="primary" onClick={handleShare}>
            Share!
          </Button>
                </Modal.Footer>
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
                            <th>Share</th>
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
                                <td>
                                    <Button type="primary" onClick={
                                        () => onShare(bucketName, object["Key"])
                                    } active style={{ width: 50 }}>
                                        <IoMdShare />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </Table>
                </div>
            </div>
            <h3>Files Shared with You:</h3>
            <div>
                <div>
                    <Table striped bordered hover>
                        <tr>
                            <th>Name</th>
                            <th>Download</th>
                        </tr>
                        {sharedObjectData && sharedObjectData.map((object) => (
                            <tr>
                                <td>{object[1]}</td>
                                <td>
                                    <Button type="primary" onClick={
                                        () => onDownload(object[0], object[1])
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
            {renderShareModal()}
        </div>
    );
};

export default ObjectComponent;
