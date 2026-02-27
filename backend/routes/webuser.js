import express from 'express';
 
const router = express.Router();

import { signup, login } from '../controllers/webuser.js';

/* Create an account */
router.post('/signup', signup);

/* Connection */
router.post('/login', login);

export default router;