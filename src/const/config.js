import {Int} from "@terra-money/terra.js";
import * as path from "path";

export let config = {};

config.network = 'localterra';
// const network = 'testnet';
// const network = 'mainnet';

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


config.port = 3000
config.telegramBotToken = '1284332659:AAFn-yeQJ6xlUzzwCcXGU9dz_a3HK_86a-w';
config.lcdUrl = lcdUrls[config.network]
config.chainID = chainIds[config.network]
config.mnemonicPath = mnemonicPaths[config.network];

config.gasPrices = "0.15uluna,0.15uusd,0.1018usdr,178.05ukrw,431.6259umnt";
config.authorizationPeriod = new Int(86400 * 365 * 100 * 1000000000) // 100 years
config.mongoDbPassword = '7Rknqg6SFXUuCVjI'
config.mongoDbName = 'terra-telegram-bot-backend'
config.mongoDbUri = `mongodb+srv://admin:${config.mongoDbPassword}@terra-telegram-bot.30t8v.mongodb.net/${config.mongoDbName}?retryWrites=true&w=majority`


