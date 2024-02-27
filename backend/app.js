const express = require('express')
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes.js');
const dbConnect=require('./utils/databaseConnect.js');
const cors = require('cors');
require('dotenv').config();

dbConnect();


const app = express();


