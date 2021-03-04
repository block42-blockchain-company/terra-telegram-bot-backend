import express from 'express';
import cookieParser from 'cookie-parser'
import {delegationRouter} from "./router/delegationRouter";
import bodyParser from "body-parser";
import {errorHandler, loggingMiddleware} from "./service/middlewareService";
import {config} from "./const/config";


const app = express();
app.use(loggingMiddleware);
app.use(bodyParser.json());
app.use(`/${config.network}/msgauth`, delegationRouter);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(errorHandler)

app.listen(config.port);





