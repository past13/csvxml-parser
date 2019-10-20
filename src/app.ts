import express, { Application } from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import * as bodyParser from "body-parser";

import { Routes } from './routes';
var multer = require('multer');
const fileUpload = require('express-fileupload');

class App {
    
    public app: Application = express();
    public mongoUrl: string = 'mongodb://localhost/csvxml-parser';

    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.urlencoded({
            extended: false
         }));
       
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(multer({dest:'./uploads/'}))
    }

    private mongoSetup(): void {
        const ConnectSettings = {
            keepAlive: true,
            reconnectTries: Number.MAX_VALUE
        };
        
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, ConnectSettings, (err: any) => {
        
        if (err) console.log(`Error`, err); 
            console.log(`Connected to MongoDB`);
        });
    }
}

export default new App().app;

