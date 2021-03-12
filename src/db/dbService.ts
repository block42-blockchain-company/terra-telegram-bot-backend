import {config} from "../const/config";
import {log} from "../const/logger";
import mongoose from 'mongoose';
import {VoteDelegation} from "./schemas";


mongoose.connect(config.mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000
}, function (err) {
    if (err) {
        throw err;
    }
    log.info("MongoDB connected successfully!");

});


export async function addDelegation(walletAddress: string, userId: string) {
    let query = VoteDelegation.findOneAndUpdate({telegramId: userId}, {
        walletAddress: walletAddress
    }, {upsert: true, new: true, setDefaultsOnInsert: true});

    return await query.exec();
}


export async function hasUserDelegated(userId: string) {
    let result = await VoteDelegation.findOne({telegramId: userId}).exec();

    return result != null;
}


export async function getUser(userId: string) {
    return await VoteDelegation.findOne({telegramId: userId}, {__v: 0, _id: 0}).exec();
}

export async function getWalletAddress(userId: string) {
    const user = await getUser(userId);

    return user ? user['walletAddress'] : null;
}

export async function closeDbConnection() {
    log.info("Disconnecting db...")
    await mongoose.disconnect()
}
