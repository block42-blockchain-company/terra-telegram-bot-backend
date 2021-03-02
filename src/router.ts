import express from "express";
import * as crypto from "crypto";
import {GenericAuthorization, Int, MsgGrantAuthorization} from "@terra-money/terra.js";
import {generateMsgGrantAuthorization} from "./service/delegationService";
import {log} from "./const/logger";
import {config} from "./const/config";

export const router = express.Router();


router.get('/delegate/:address', (req, res) => {
    let auth = generateMsgGrantAuthorization(req.params['address'])

    res.send({result: auth.toJSON()})
})

