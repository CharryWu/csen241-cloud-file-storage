import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import BucketService from "../services/bucket.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BucketComponent = () => {
  let [bucketData, setBucketData] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate()

  useEffect(() => {
    if (userData.name == "") {
      navigate("/login")
      return
    }
    BucketService.post("/" + userData.name)
      .then((res) => {
        setBucketData(res.data);
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
            {bucketData && (
              <tr>
                <td>{bucketData["name"]}</td>
                <td>{bucketData["CreationDate"]}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BucketComponent;
