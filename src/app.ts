import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser'
import {router} from "./router";
import bodyParser from "body-parser";
import {loggingMiddleware, telegramAuthenticationMiddleware} from "./service/middlewareService";
import {config} from "./const/config";
import {log} from "./const/logger";

const app = express();
app.use(loggingMiddleware);
app.use(telegramAuthenticationMiddleware);

app.use(bodyParser.json());
app.use('/', router);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.listen(config.port, () => {
    return log.info(`server is listening on ${config.port}`);
});





