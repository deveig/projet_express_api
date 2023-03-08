const jsonWebToken = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const  randomKey = process.env.RANDOM_KEY;

/* Decode the token */
module.exports = (req, res, next) => {
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
       res.status(401).json({ error: 'You are not allowed to log in !' });
    }
}