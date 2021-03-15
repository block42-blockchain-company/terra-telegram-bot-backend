# Terra Telegram Bot Backend

This backend is an additional module for [Terra Telegram Bot](https://github.com/block42-blockchain-company/thornode-telegram-bot) and operates with [terra-telegram-bot-website](https://github.com/block42-blockchain-company/terra-telegram-bot-website).

## Running this project
First you need to add a necessary configuration, to do it just fill out all empty variables in `.env` file. 

Before starting install dependencies with
```
npm install
```

Intellij configuration is available out of the box, to start just run or debug `app.ts` configuration.



## Users authorization
Most of the methods in this API can be called only by users logged in via [Telegram Seamless Login](https://core.telegram.org/api/url-authorization). You need to pass all HTTP arguments added by Telegram to use protected methods. 

## Api documentation
No API docs are available at the moment as this project is in early beta, for available routes just see code under `/router` directory.

## Deployment

For deployment [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) is used. To deploy testnet instance run
```
pm2 deploy testnet-pm2.json testnet
```
Hint: If you have uncommitted changes and pm2 blocks your deployment use `--force` flag.    

To check how to display logs, status and other useful data see [quick start guide](https://pm2.keymetrics.io/docs/usage/quick-start/).

