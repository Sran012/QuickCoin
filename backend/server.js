// const express = require("express");
import { config } from "dotenv";
import express from "express";
import rootRouter from './routes/index.js';
const app = express();
import cors from 'cors';

config();

app.use(express.json());
app.use(cors());


app.use('/v1', rootRouter)


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})




