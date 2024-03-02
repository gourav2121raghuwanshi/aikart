const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ 
  cloud_name: 'djrzg20q4', 
  api_key: '894362325429518', 
  api_secret: 'uJWNP0vR8sa1m9sffvP3u6BX6ww' 
});

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder: "aikart",
    allowedFormats: ['jpg', 'png', 'gif', 'jpeg', 'webp']
  }
});

const upload = multer({storage});

module.exports = {
  cloudinary,
  storage,
  upload
} 