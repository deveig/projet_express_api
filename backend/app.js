import express, { json } from 'express';

const app = express();

import helmet from 'helmet';

import webUser from './routes/webuser.js';

import sauce from './routes/sauce.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
config();
const  access = process.env.DB_KEY;
const database = process.env.DB_NAME;

import { connect } from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Connecting to the database */
connect(`${access}`, { dbName: database })
  .then(() => { 
    console.log('Connexion à MongoDB réussie !');
  })
  .catch(() => { 
    console.log('Connexion à MongoDB échouée !');
  });

/* Middleware */

/* Adding security headers */
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }
));

/* Adding CORS Headers */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/* Acquiring Query Body Data in JSON Format */
app.use(json());

/* User login */
app.use('/api/auth', webUser);

/* Access to sauces */ 
app.use('/api/sauces', sauce);

/* Image path */
app.use('/images', express.static(path.join(__dirname, 'images')));

/* Error handling */
app.use((error, req, res, next) => {
  res.status(500).json({ error });
});

export default app;