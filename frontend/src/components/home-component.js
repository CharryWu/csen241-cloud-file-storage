import React from "react";

const HomeComponent = () => {
  return (
    <main>
      <div className="container py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Welcome to File Storage System</h1>
            <p className="col-md-8 fs-4">
              This website is to download files using the AWS S3 service.
            </p>
            <button className="btn btn-primary btn-lg" type="button">
              Getting started!
            </button>
          </div>
        </div>
        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2024-Winter CSEN241
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
