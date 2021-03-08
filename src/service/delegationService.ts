import {
    GenericAuthorization,
    LCDClient,
    MnemonicKey,
    MsgExecAuthorized,
    MsgGrantAuthorization,
    MsgVote
} from "@terra-money/terra.js";
import * as fs from "fs";
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

let wallet: Wallet;

fs.readFile(config.mnemonicPath, (err, data) => {
    if (err) {
        const msg = `No mnemonic provided under ${config.mnemonicPath}`;
        throw Error(msg);
    }
    wallet = client.wallet(new MnemonicKey({mnemonic: data.toString()}));
    log.info("Wallet loaded successfully!")
})


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

    const hasDelegated = await hasGrantedPermission(address);

    if (hasDelegated) {
        return await addDelegation(address, telegramUserId);
    } else {
        throw new AuthNotDelegated();
    }

}

async function hasGrantedPermission(address: string): Promise<boolean> {
    let url = config.lcdUrl + `msgauth/granters/${address}/grantees/${wallet.key.accAddress}/grants`
    //todo: add /vote in the end and change handling!
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

    console.log(client);

    const tx = await wallet.createAndSignTx({msgs});

    return await client.tx.broadcast(tx);
}