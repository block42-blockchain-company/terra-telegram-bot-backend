import {GenericAuthorization, LCDClient, MnemonicKey, MsgGrantAuthorization} from "@terra-money/terra.js";
import * as fs from "fs";
import {Wallet} from "@terra-money/terra.js/dist/client/lcd/Wallet";
import {log} from "../const/logger";
import {config} from "../const/config";


const client = new LCDClient({
    URL: config.lcdUrl,
    chainID: config.chainID,
    gasPrices: config.gasPrices,
});

// Todo: make promise
let wallet: Wallet;

fs.readFile(config.mnemonicPath, (err, data) => {
    if (err) {
        throw Error("No mnemonic provided!")
    }
    wallet = client.wallet(new MnemonicKey({mnemonic: data.toString()}));
    log.info("Wallet loaded successfully!")
})


export function generateMsgGrantAuthorization(address: string): MsgGrantAuthorization {
    return new MsgGrantAuthorization(
        address,
        wallet.key.accAddress,
        new GenericAuthorization('gov/MsgVote'),
        config.authorizationPeriod
    );
}

