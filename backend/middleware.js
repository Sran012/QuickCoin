import {config} from 'dotenv';
import jwt from 'jsonwebtoken' ;
config();

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader ||  !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ msg : "user not verified"});
    }

    const jwtToken = authHeader.split(' ')[1];

    try {
        const data = jwt.verify(jwtToken, process.env.SECRET_KEY,);
        req.userId = data.userId ;
        next();
    } catch (error) {
        return res.json({msg: "user not authenticated"});
    }
};

export default authMiddleware;