import crypto from "crypto";
import {config} from "../const/config";
import {log} from "../const/logger";
import express from 'express';
import {AddressIncorrectForm, AuthNotDelegated} from "../const/errors";
import "express-async-errors";

export function loggingMiddleware(req: express.Request, res: express.Response, next) {
    log.info(`${req.method} ${req.path}`)
    next();
}

export function onlyLoggedInFromTelegram(req: express.Request, res: express.Response, next) {
    log.info("Checking Telegram authentication")
    if (telegramAuthorized(req.query)) {
        next();
    } else {
        res.status(401).json({error: 'Unauthorized!'})
    }
}


function telegramAuthorized(query) {

    // In 'localterra' we skip authorization for easier testing
    if (config.network == "localterra") {
        return true
    }

    let hash = query['hash']
    delete query['hash']

    const secretKey = crypto.createHash('sha256')
        .update(config.telegramBotToken)
        .digest();

    const dataCheckString = Object.keys(query)
        .sort()
        .map(key => (`${key}=${query[key]}`))
        .join('\n');

    const hmac = crypto.createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    return hmac === hash;
}

export function errorHandler(err, req, res, next) {
    if (err instanceof AuthNotDelegated) {
        return res.status(405).send({error: "Auth is not delegated! Use /generate/{address} and broadcast it first!"})
    } else if (err instanceof AddressIncorrectForm) {
        return res.status(405).send({error: "Provided address has incorrect form!"})
    }

    log.error(err)
    next(res);
}