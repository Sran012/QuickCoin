import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const router = express.Router();
import jwt from 'jsonwebtoken';
import {z} from 'zod';
import {User, Account} from '../db.js';
import authMiddleware from '../middleware.js';
import bcrypt from 'bcrypt';
const saltRounds = 10 ;

const signupSchema = z.object({
    username: z.string(),
    password : z.string(),
    firstName: z.string(),
    lastName : z.string(),
});

const signinSchema = z.object({
    username: z.string(),
    password : z.string()
});

const updateBody = z.object({
    password:z.string().optional(),
    userName: z.string().optional(),
    lastName: z.string().optional() 
});


router.get("/", authMiddleware, async (res,req) => {
     const account = await Account.findOne({userId: req.userId});

     const user = await User.findOne({_id: req.userId});

     res.status(200).json({
        msg: "authenticated",
        initialAmount: account.balance ,
        username: user.username
     });
});

router.post("/signup", async (req,res) => {
    if (!signupSchema.safeParse(req.body).success) {
        res.status(411).json({msg: "incorrect input"});
    }
    else { 
        try {
            const existingUser = await Account.findOne({username: req.body.username});
            if (existingUser){
                res.status(411).json({msg: "user already exist"});
                return;
            }

            const hash = await bcrypt.hash(req.body.password, saltRounds);

            const user = await User.create({
                username: req.body.username,
                password: hash ,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            });

            const userId = user._id;
            const initialAmount = 3400;

            await Account.create({
                userId,
                balance: initialAmount
            })

            const token = jwt.sign({userId},process.env.SECRET_KEY );

            res.json({
                message: "user created successfully",
                token,
                initialAmount
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg : "internal server error"
            });
        }
    }
});


router.post('/signin', async (req,res) => {
    if (!(signinSchema.safeParse(req.body).success)) {
        res.json({
            msg: "invalid inputs"
        });
    } 
    else {
        try{
            const user = await User.findOne({
                username: req.body.username
            });
        const match = await bcrypt.compare(req.body.password, user.password);

        const account = await Account.findOne({
            userId: user._id
        });
        const initialAmount = account.balance;
        if (match){
            const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY);
            res.json({
                token,
                initialAmount
            });
            return;
        } else {
            res.status(411).json({
                msg: "error while logging in"
            });
        }
        } catch(err) {
            console.log(err);
            res.status(500).json({msg : "internal server error"});
        }
    }
});

router.put('/', authMiddleware, async(req,res) => {
    if (!(updateBody.safeParse(req.body).success)){
        res.json({msg: "invalid inputs"});
        return;
    }

    await User.updateOne(req.body,{
        _id: req.UserId,
    });
    res.status(500).json({
        msg: "updated successfully"
    });
});


router.get('/bulk', async (req,res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or : 
        [{firstName: {"$regex": filter}},
        {lastName: {"$regex": filter}}]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});


router.get("/getUser", authMiddleware, async (req, res) => {
    const user = await User.findOne({
      _id: req.userId,
    });
    res.json(user);
  });

export default router;