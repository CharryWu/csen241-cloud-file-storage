import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import BucketService from "../services/bucket.service";
import { useSelector } from "react-redux";
import checkLogIn from "./auth/auth";
import { useNavigate } from "react-router-dom";

const BucketComponent = () => {
  let [bucketData, setBucketData] = useState(null);
  let [bucketOwner, setBucketOwner] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate()
  
  useEffect(() => {
    if(userData.name == ""){
      navigate("/login")
      return
    }
    BucketService.get("/" + userData.name)
      .then((res) => {
        console.log(res.data);
        setBucketData(res.data['Buckets']);
        setBucketOwner(res.data['Owner'])
      })
      .catch((e) => {
        window.alert(e);
      });
  }, []);

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
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
  );
};

export default BucketComponent;
