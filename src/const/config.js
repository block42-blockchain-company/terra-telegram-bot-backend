import {Int} from "@terra-money/terra.js";
import * as path from "path";
import {log} from "../../dist/const/logger";

export let config = {};


const availableNetworks = ['localterra', 'testnet', 'mainnet'];


const lcdUrls = {
    'localterra': 'http://localhost:1317/',
    'testnet': 'https://tequila-lcd.terra.dev/',
    'mainnet': 'https://lcd.terra.dev/'
}

const chainIds = {
    'localterra': 'localterra',
    'testnet': 'tequila-0004',
    'mainnet': 'columbus-4'
}

const configFolder = path.resolve('config');

const mnemonicPaths = {
    'localterra': path.join(configFolder, 'mnemonic_local.txt'),
    'testnet': path.join(configFolder, 'mnemonic_testnet.txt'),
    'mainnet': path.join(configFolder, 'mnemonic_prod.txt'),
}

config.network = availableNetworks.includes(process.env.network) ? process.env.network : 'localterra'
config.port = 3000
config.telegramBotToken = '1284332659:AAFn-yeQJ6xlUzzwCcXGU9dz_a3HK_86a-w';
config.lcdUrl = lcdUrls[config.network]
config.chainID = chainIds[config.network]
config.mnemonicPath = mnemonicPaths[config.network];

config.authorizationPeriod = new Int(86400 * 365 * 100 * 1000000000) // 100 years
config.mongoDbUri = `mongodb+srv://admin:7Rknqg6SFXUuCVjI@terra-telegram-bot.30t8v.mongodb.net/${config.network}-terra-backend?retryWrites=true&w=majority`


