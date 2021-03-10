import express from 'express';
import cookieParser from 'cookie-parser'
import {delegationRouter} from "./router/delegationRouter";
import bodyParser from "body-parser";
import {errorHandler} from "./service/middlewareService";
import {config} from "./const/config";
import morgan from 'morgan'
import {log} from "../dist/const/logger";
import helmet from 'helmet';
import {closeDbConnection} from "./db/dbService";

const app = express();
app.use(morgan('common'))
app.use(bodyParser.json());
app.use(`/${config.network}/msgauth`, delegationRouter);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(errorHandler)
app.use(helmet())
app.get('*', notFoundHandler);
app.listen(config.port);

log.info(`Starting on ${config.network} and port ${config.port}`)

process.on('beforeExit', cleanup);


async function cleanup() {
    await closeDbConnection()
    process.exit(0)
}

function notFoundHandler(req, res) {
    res.status(404).send({result: "Nothing to be done here"});
}
