const express = require("express");
const app = express();
const cors = require("cors");
const bucketRoute = require("./routes").bucket;
const objectRoute = require("./routes").object;
const downloadRoute = require("./routes").download;
let dotenv = require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/bucket", bucketRoute);
app.use("/api/object", objectRoute);
app.use("/api/download", downloadRoute);

app.listen(process.env.UPLOADER_BACKEND_PORT, () => {
    console.log(`Server is running on port ${process.env.UPLOADER_BACKEND_PORT}...`)
});
