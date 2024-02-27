const express = require('express')
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes.js');
const dbConnect=require('./utils/databaseConnect.js');
const cors = require('cors');
require('dotenv').config();

dbConnect();



const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors());
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
})

