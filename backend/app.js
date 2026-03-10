const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes.js');
const userRouter = require("./routes/userRoutes.js");
const aiRoutes = require('./routes/aiRoutes.js');
const dbConnect = require('./utils/databaseConnect.js');
const upload = require('./utils/fileupload.js');
const cors = require('cors');

require('dotenv').config();

dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true,
}));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/ai', aiRoutes);

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  return res.status(200).json({
    url: req.file.path,
    mimetype: req.file.mimetype,
    filename: req.file.filename,
  });
});

app.get('/', (req, res) => {
  console.log("App is running");
  return res.send("App is running");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
  });
});

if (process.env.VERCEL !== '1') {
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
}

module.exports = app;