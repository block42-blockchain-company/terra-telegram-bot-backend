import express from "express";
import {broadcastVote, generateMsgGrantAuthorization, handleDelegationConfirm} from "../service/delegationService";
import {onlyLoggedInFromTelegram} from "../service/middlewareService";
import {getUser, getWalletAddress, hasUserDelegated} from "../db/dbService";
import {MsgVote} from "@terra-money/terra.js";


export const delegationRouter = express.Router();


delegationRouter.get('/generate/:address', onlyLoggedInFromTelegram, (req, res) => {
    let auth = generateMsgGrantAuthorization(req.params['address']).toData()

    res.send({result: auth})
})

delegationRouter.post('/confirm/:address', onlyLoggedInFromTelegram, async (req, res) => {
    let result = await handleDelegationConfirm(req);
    return res.status(200).send({result: {saved: result}})
})

delegationRouter.get('/has-delegated/:userId', async (req, res) => {
    let hasDelegated = await hasUserDelegated(req.params['userId'])

    res.send({result: hasDelegated})
})


delegationRouter.get('/user/:userId', async (req, res) => {
    let user = await getUser(req.params['userId'])

    res.send({result: user})
})


delegationRouter.post('/vote/:userId', async (req, res) => {
    const userId = req.params['userId'];
    let vote = MsgVote.fromData(req.body)
    vote.voter = await getWalletAddress(userId);

    let result = await broadcastVote(vote)

    res.send({result: result})
})