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
    const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate()

    useEffect(() => {
        if(userData.name == ""){
            navigate("/login")
            return
        }
        BucketService.get()
        .then((res) => {
          setBucketData(res.data);
          if (res.data['Name']) {
            ObjectService.get(res.data['Name'])
              .then((res) => {
                  setObjectData(res.data['Contents']);
              })
              .catch((e) => {
                  window.alert(e);
              });
          }
        })
        .catch((e) => {
          window.alert(e);
        });
    }, []);

    // const handleSearch = () => {
    //     ObjectService.get(bucketName)
    //         .then((res) => {
    //             setObjectData(res.data['Contents']);
    //         })
    //         .catch((e) => {
    //             window.alert(e);
    //         });
    // };

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
                    </tr>
                    </thead>
                    <tbody>
                    {bucketData && (
                        <tr>
                        <td>{bucketData["Name"]}</td>
                        <td>{bucketData["CreationDate"]}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
        <p></p>
        <div>
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
