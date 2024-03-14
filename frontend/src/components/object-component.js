import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ObjectService from "../services/object.service";
import BucketService from "../services/bucket.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ObjectComponent = () => {
    let [bucketName, setBucketName] = useState(null);
    let [objectData, setObjectData] = useState(null);
    let [bucketData, setBucketData] = useState(null);
    let [bucketOwner, setBucketOwner] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate()

    useEffect(() => {
        if(userData.name == ""){
            navigate("/login")
            return
        }
        BucketService.get()
        .then((res) => {
            setBucketData(res.data['Buckets']);
            setBucketOwner(res.data['Owner'])
        })
        .catch((e) => {
            window.alert(e);
        });
    }, []);

    const handleBucketName = (e) => {
        setBucketName(e.target.value);
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

return (
    <div style={{ padding: "3rem" }} className="col-md-12">
        <div>
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
        </div>
        <p></p>
        <div>
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
        </div>
    </div>
  );
};

export default ObjectComponent;
