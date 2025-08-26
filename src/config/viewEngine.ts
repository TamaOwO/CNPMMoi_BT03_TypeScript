import express, {Express} from 'express';
const configViewEngine = (app:Express):void => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}
export default configViewEngine;