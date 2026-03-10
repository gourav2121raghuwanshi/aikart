
// *****cannot do in vercel

// const multer = require("multer");
// const storage = multer.diskStorage({
//     destination: "./public/uploads/",
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
//     }
// })
// const upload = multer({ storage: storage }) 

const { upload } = require('./cloudinary.js');
module.exports = upload;
module.exports = upload





