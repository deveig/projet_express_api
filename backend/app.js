const express = require('express');

const app = express();

const helmet = require('helmet');

const webUser = require('./routes/webuser');

const sauce = require('./routes/sauce');

const path = require('path');

const dotenv = require('dotenv');
dotenv.config();
const  access = process.env.DB_KEY;
const database = process.env.DB_NAME;

const mongoose = require('mongoose');

/* Connecting to the database */
mongoose.connect(`${access}`, { dbName: database })
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
app.use(express.json());

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

module.exports = app;