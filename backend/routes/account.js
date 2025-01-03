{/*
import express from 'express';
import authMiddleware from '../middleware.js';
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();
// import {jwt} from "jsonwebtoken";
import {Account,User} from "../db.js";
import mongoose from 'mongoose';


router.get('/balance',authMiddleware, async(req,res) => {

    try {
        const user = await Account.findOne({userId: req.userId});
        const userBalance = user.balance;
        res.status(200).json({
            balance: userBalance
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            msg: "internal server error"
        });
    }
});

router.post('/transfer',authMiddleware, async (res,req) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (account.balance < req.body.amount) {
            throw new Error("insufficient balance");
        }

        const newAmount = account.balance - req.body.amount;
        const name = await User.findOne({_id: req.userId});
        const userName = name.username;
        const toAccount = await Account.findOne({
            userId: req.body.to
        }).session(session);

        if (!toAccount) {
            throw new Error("invalid error");
        }

        await Account.updateOne({userId: req.userId}, {$inc: {balance: -req.body.amount}}).session(session);
        await Account.updateOne({userId: req.body.to}, {$inc: {balance: req.body.amount}}).session(session);

        await session.commitTransaction();
        res.status(500).json({
            msg: "transaction successful",
            newAmount,
            userName
        });
    } catch (err){
        console.log(err);
        await session.abortTransaction();
        res.status(500).json({
            msg: err.message || "transaction failed"
        });
    } finally {
        session.endSession();
    }
});

export default router;

*/}


import express from 'express';
import authMiddleware from '../middleware.js';
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();
// import {jwt} from "jsonwebtoken";
import {Account, User} from "../db.js";
import mongoose from 'mongoose';


router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const user = await Account.findOne({ userId: req.userId });
        const userBalance = user.balance;
        res.status(200).json({
            balance: userBalance
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "internal server error"
        });
    }
});

router.post('/transfer', authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        if (account.balance < req.body.amount) {
            throw new Error("insufficient balance");
        }

        const newAmount = account.balance - req.body.amount;
        const name = await User.findOne({ _id: req.userId });
        const userName = name.username;
        const toAccount = await Account.findOne({
            userId: req.body.to
        });

        if (!toAccount) {
            throw new Error("invalid error");
        }

        // Update balances directly without using transactions
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -req.body.amount } });
        await Account.updateOne({ userId: req.body.to }, { $inc: { balance: req.body.amount } });

        res.status(200).json({
            msg: "transaction successful",
            newAmount,
            userName
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: err.message || "transaction failed"
        });
    }
});

export default router;
