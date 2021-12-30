"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const cloudinary_1 = require("cloudinary");
function setupCloundinary() {
    if (typeof process.env.CLOUDINARY_URL === 'undefined') {
        console.warn('!! cloudinary config is undefined !!');
        console.warn('export CLOUDINARY_URL or set dotenv file');
        process.exit(1);
    }
    else {
        console.log('Cloudinary URL is found');
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    }
}
exports.default = setupCloundinary;
//# sourceMappingURL=setupCloudinary.js.map