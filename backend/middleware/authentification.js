import jwt from 'jsonwebtoken';

import { config } from 'dotenv';
config();
const  randomKey = process.env.RANDOM_KEY;
/* Decode the token */
export default (req, res, next) => {
   try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonWebToken.verify(token, randomKey);
        const userId = decodedToken.userId;
        req.authentification = {
            userId: userId
        };
        next();
    } 
    catch (error) {
       res.status(401).json({ error: 'Please log in !' });
    }
}