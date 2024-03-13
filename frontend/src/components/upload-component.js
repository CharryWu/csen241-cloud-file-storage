import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import FilePondComponent from "./filepond-component";
import BucketService from "../services/bucket.service";
import ObjectService from "../services/object.service";
import AlertDismissible from "./alert-component";

const UploadComponent = () => {
    let [bucketName, setBucketName] = useState(null);
    let [objectName, setObjectName] = useState(null);
    let [bucketData, setBucketData] = useState(null);
    let [objectData, setObjectData] = useState(null);
    let [bucketOwner, setBucketOwner] = useState(null);

    useEffect(() => {
        BucketService.get()
        .then((res) => {
            setBucketData(res.data['Buckets']);
            setBucketOwner(res.data['Owner']);
        })
        .catch((e) => {
            window.alert(e);
        });
    }, []);

    const handleBucketName = (e) => {
        setBucketName(e.target.value);
    };

    const handleObjectName = (e) => {
        setObjectName(e.target.value);
    };

    const handleSearch = () => {
        ObjectService.get(bucketName)
            .then((res) => {
                setObjectData(res.data['Contents']);
            })
            .catch((e) => {
                window.alert(e);
            });
    };

    const handleUpload = () => {
        DownloadService.get(bucketName, objectName)
            .then((res) => {
                window.open(res.data);
            })
            .catch((e) => {
                window.alert(e);
            });
    };

    return (
        <div style={{ padding: "3rem" }} className="col-md-12">
            <h3>Buckets:</h3>
            <div>
                <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>CreationDate</th>
                    <th>Owner</th>
                </tr>
                </thead>
                <tbody>
                {bucketData && bucketData.map((bucket) => (
                    <tr>
                        <td>{bucket["Name"]}</td>
                        <td>{bucket["CreationDate"]}</td>
                        <td>{bucketOwner.DisplayName}</td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </div>
            <p></p>
            <p></p>
            <div>
                <h3>Objects:</h3>
                <div className="form-group">
                    <label>Bucket Name: </label>
                    <input
                        onChange={handleBucketName}
                        type="text"
                        className="form-control"
                    />
                </div>
                <p></p>
            <div>
                <button onClick={handleSearch} className="btn btn-primary">
                    <span>SEARCH</span>
                </button>
            </div>
            <p></p>
            <div>
                <Table striped bordered hover>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>LastModified</th>
                    </tr>
                    {objectData && objectData.map((object) => (
                        <tr>
                            <td>{object["Key"]}</td>
                            <td>{object["Size"]}</td>
                            <td>{object["LastModified"]}</td>
                        </tr>
                    ))}
                </Table>
            </div>
                <p></p>
                <h2>To upload:</h2>
                <FilePondComponent/>
            </div>
        </div>
      );
};

export default UploadComponent;