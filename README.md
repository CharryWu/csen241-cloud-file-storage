# Cloud File Storage System

Welcome to the Cloud File Storage System repository!

## Overview

This project is a cloud-based file storage system developed as part of the CSEN241 course. The system allows users to upload, download, and manage their files in the cloud. It provides features such as user authentication, file encryption, and secure storage on a public cloud with private settings that mimics that of Google Drive

## Pre-Requisites
- **AWS Account:** You would need an AWS account with IAM roles for AWS S3, EC2, Cognito, and DynamoDB (Free Tier is good enough)
- **AWS Access Token:** You would need to generate access tokens for the AWS CLI to access the AWS Services we used

## Features

- **User authentication:** Users can create accounts and log in securely.
- **File upload/download:** Users can upload files to the cloud and download them when needed.
- **Secure storage:** Files are encrypted before being stored in the cloud to ensure security.
- **User management:** Administrators can manage user accounts and permissions.

## Installation

To set up the Cloud File Storage System locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/CharryWu/csen241-cloud-file-storage.git

2. Navigate to Project Directory:

   ```bash
   cd csen241-cloud-file-storage

3. Install dependencies:

   ```bash
   #Frontend
   cd frontend
   npm install
   
   #Backend Uploader
   cd backend 
   cd uploader_service
   pip install -r requirements.txt
  
   #Backend Downloader
   cd backend 
   cd downloader_service
   npm install
   
   

4. Set up environment variables:
   Create a .env file in the backend directory and specify the following variables:

   ```makefile
   PORT=<>
   DOWNLOADER_BACKEND_PORT=<>
   DOWNLOADER_BACKEND_HOST=<>
   UPLOADER_BACKEND_PORT=<>
   UPLOADER_BACKEND_HOST=<>
   UPLOADER_FILE_PORT=<>
   UPLOADER_FILE_HOST=<>
    
   AWS_ACCESS_KEY_ID=<>
   AWS_SECRET_ACCESS_KEY=<>
   AWS_REGION_NAME=<>
    
   UPLOAD_DEFAULT_BUCKET=<>
   UPLOAD_DEFAULT_REGION=<>
    
   REACT_FRONTEND_PORT = <>


5. Start the frontend server:

   ```bash
   cd frontend
   npm run start
   
6. Start the backend server

   ```bash
   # Uploader Server
   cd backend
   cd uploader_service
   python app.py
   # Downloader Service
   cd downloader_Service
   npm run start
   
7. Access the application at http://localhost:3000 (or the port you specified in .env)

## Usage
   - Sign up for an account or log in if you already have one.
   - Upload files by clicking the "Upload" button and selecting the desired files.
   - Download files by clicking on the file name in the file list.
   - Manage your account settings and files as needed.
  
## Contributing
   Contributions to the Cloud File Storage System are welcome! If you would like to contribute, please follow these steps:

   1. Fork the repository.
   2. Create a new branch for your feature or bug fix.
   3. Make your changes and commit them with descriptive messages.
   4. Push your changes to your fork.
   5. Submit a pull request to the andy_branch branch of the original repository.
 
