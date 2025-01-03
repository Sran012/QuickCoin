import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("connected to database"))
    .catch(err => console.log("failed to connect to database", err));


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        minLength: 3,
        maxLength:30
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },

});

export const User = mongoose.model('user',userSchema);





const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    balance:{
        type:Number,
        required: true
    }
});

export const Account = mongoose.model('account',accountSchema);




