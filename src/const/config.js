import {Int} from "@terra-money/terra.js";

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

config.network = availableNetworks.includes(process.env.network) ? process.env.network : 'localterra'
config.lcdUrl = lcdUrls[config.network]
config.chainID = chainIds[config.network]
config.authorizationPeriod = new Int(86400 * 365 * 100 * 1000000000) // 100 years

// env variables
config.port = process.env.port ?? 3000
config.telegramBotToken = process.env.bot_token;
config.mongoDbUri = process.env.mongo_uri;
config.mnemonic = process.env.mnemonic;
