import crypto from "crypto";
import {config} from "../const/config";
import {log} from "../const/logger";
import express from 'express';

export function loggingMiddleware(req: express.Request, res: express.Response, next) {
    log.info(`${req.method} ${req.path}`)
    next();
}

export function telegramAuthenticationMiddleware(req: express.Request, res: express.Response, next) {
    if (telegramAuthorized(req.query)) {
        next();
    } else {
        res.status(401).json({error: 'Unauthorized!'})
    }
}


function telegramAuthorized(query) {
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
