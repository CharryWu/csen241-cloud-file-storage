const path = require('path')
let dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
exports.default = dotenv.parsed
