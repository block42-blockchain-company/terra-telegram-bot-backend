import {
    GenericAuthorization,
    LCDClient,
    MnemonicKey,
    MsgExecAuthorized,
    MsgGrantAuthorization,
    MsgVote
} from "@terra-money/terra.js";
import {Wallet} from "@terra-money/terra.js/dist/client/lcd/Wallet";
import {log} from "../const/logger";
import {config} from "../const/config";
import axios from "axios";
import express from "express";
import {addDelegation} from "../db/dbService";
import {AddressIncorrectForm, AuthNotDelegated} from "../const/errors";
import "express-async-errors";


const client = new LCDClient({
    URL: config.lcdUrl,
    chainID: config.chainID
});


const wallet: Wallet = client.wallet(new MnemonicKey({mnemonic: config.mnemonic}));
log.info("Wallet loaded successfully!")

export function generateMsgGrantAuthorization(address: string): MsgGrantAuthorization {
    return new MsgGrantAuthorization(
        address,
        wallet.key.accAddress,
        new GenericAuthorization('vote'),
        config.authorizationPeriod
    );
}


export async function handleDelegationConfirm(req: express.Request) {
    const address = req.params['address']
    const telegramUserId = req.query['id'].toString()

    const hasDelegated = await hasDelegatedVoting(address);

    if (hasDelegated) {
        return await addDelegation(address, telegramUserId);
    } else {
        throw new AuthNotDelegated();
    }

}

async function hasDelegatedVoting(address: string): Promise<boolean> {
    let url = config.lcdUrl + `msgauth/granters/${address}/grantees/${wallet.key.accAddress}/grants`

    let response;
    try {
        response = await axios.get(url);
    } catch (e) {
        if (e?.response?.status == 400) {
            throw new AddressIncorrectForm();
        } else {
            throw e;
        }
    }

    let elements = response.data['result'];
    if (elements == null) {
        return false;
    }

    for (let element of elements) {
        const isNotExpired = new Date(element['expiration']).getTime() > Date.now()
        const grantType = element['authorization']['value']['grant_msg_type'];
        if (isNotExpired && grantType == 'vote') {
            return true
        }
    }

    return false
}


export async function broadcastVote(vote: MsgVote) {
    const msgs = [
        new MsgExecAuthorized(wallet.key.accAddress, [
            vote,
        ]),
    ];

    const tx = await wallet.createAndSignTx({msgs});

    return await client.tx.broadcast(tx);
}