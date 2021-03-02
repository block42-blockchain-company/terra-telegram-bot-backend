import {Int} from "@terra-money/terra.js";

export let config = {};

config.port = 3000

config.telegramBotToken = '1284332659:AAFn-yeQJ6xlUzzwCcXGU9dz_a3HK_86a-w';
config.lcdUrl = "http://15.164.0.235:1317/";
config.chainID = "Tequila-0004";
config.gasPrices = "0.15uluna,0.15uusd,0.1018usdr,178.05ukrw,431.6259umnt";
config.mnemonicPath = "/Users/michal/repo/terra-telegram-bot-backend/config/mnemonic.txt";
config.authorizationPeriod = new Int(86400 * 365 * 100 * 1000000000) // 100 years


