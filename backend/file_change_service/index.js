const express = require("express");
const app = express();
const cors = require("cors");
const bucketRoute = require("./routes").bucket;
const objectRoute = require("./routes").object;
const env = require("./env").default
// let dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
if (!env.DOWNLOADER_BACKEND_PORT) {
    console.log("Can't read .env file. Stop.");
    return;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/bucket", bucketRoute);
app.use("/api/object", objectRoute);

app.listen(env.DOWNLOADER_BACKEND_PORT, () => {
    console.log(`Server is running on port ${env.DOWNLOADER_BACKEND_PORT}...`)
});
