import express from 'express';
import cookieParser from 'cookie-parser'
import {delegationRouter} from "./router/delegationRouter";
import bodyParser from "body-parser";
import {errorHandler} from "./service/middlewareService";
import {config} from "./const/config";
import morgan from 'morgan'

const helmet = require('helmet');

const app = express();
app.use(morgan('common'))
app.use(bodyParser.json());
app.use(`/${config.network}/msgauth`, delegationRouter);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(errorHandler)
app.use(helmet)
app.listen(config.port);





