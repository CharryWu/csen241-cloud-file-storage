const express = require("express");
const app = express();
const cors = require("cors");
const bucketRoute = require("./routes").bucket;
const objectRoute = require("./routes").object;
const downloadRoute = require("./routes").download;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/bucket", bucketRoute);
app.use("/api/object", objectRoute);
app.use("/api/download", downloadRoute);

app.listen(8081, () => {
    console.log("Server is running on port 8081...")
});