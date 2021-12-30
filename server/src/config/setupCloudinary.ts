require('dotenv').config();
import { v2 as cloudinary } from 'cloudinary';

function setupCloundinary() {
  if (typeof process.env.CLOUDINARY_URL === 'undefined') {
    console.warn('!! cloudinary config is undefined !!');
    console.warn('export CLOUDINARY_URL or set dotenv file');
    process.exit(1);
  } else {
    console.log('Cloudinary URL is found');
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }
}
export default setupCloundinary;
