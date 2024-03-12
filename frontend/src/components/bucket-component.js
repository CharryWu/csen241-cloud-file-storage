import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import BucketService from "../services/bucket.service";

const BucketComponent = () => {
  let [bucketData, setBucketData] = useState(null);

  useEffect(() => {
    BucketService.get()
      .then((res) => {
        setBucketData(res.data['Buckets']);
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
            </tr>
            </thead>
            <tbody>
            {bucketData && bucketData.map((bucket) => (
                <tr>
                  <td>{bucket["Name"]}</td>
                  <td>{bucket["CreationDate"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
      </div>
    </div>
  );
};

export default BucketComponent;
