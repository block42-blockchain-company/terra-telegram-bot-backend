import mongoose from 'mongoose';


export const VoteDelegation = mongoose.model('VoteDelegation', new mongoose.Schema({
    telegramId: {
        type: String,
        unique: true
    },
    walletAddress: String
}));