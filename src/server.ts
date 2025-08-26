import dotenv from 'dotenv';
dotenv.config();

import express,{Express} from 'express';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/configdb';
require('dotenv').config();

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
});