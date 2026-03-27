import express, { json } from "express";

const app = express();

import helmet from "helmet";

import webUser from "./routes/webuser.js";

import sauce from "./routes/sauce.js";

import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
config();
const access = process.env.DB_KEY;
// const database = process.env.DB_NAME;

import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Save data */
import { getSauceClient } from "./models/sauce.js";
const client = await getSauceClient();
const sauce1 = {
  id: "aigre",
  name: "aigre douce".trim(),
  manufacturer: "SAD",
  description: "Sauce légèrement piquante et sucrée",
  mainPepper: "piment",
  imageUrl: "/security/images/sauce1.jpg",
  heat: 3,
  likes: 0,
  dislikes: 0,
  usersLiked: [],
  usersDisliked: [],
};
const sauce2 = {
  id:"curry",
  name: "curry".trim(),
  manufacturer: "SC",
  description: "Sauce curry piquante",
  mainPepper: "piment",
  imageUrl: "/security/images/sauce2.jpg",
  heat: 6,
  likes: 0,
  dislikes: 0,
  usersLiked: [],
  usersDisliked: [],
};
client.ft
  .search("idx:sauces", "*")
  .then((value) => {
    if (value.total === 2) {
      console.log("Data exist");
    } else {
      Promise.all([
        client.json.set(`sauce:${sauce1.name.split(" ")[0].split("-")[0].split("_")[0]}`, '$', sauce1),
        client.json.set(`sauce:${sauce2.name.split(" ")[0].split("-")[0].split("_")[0]}`, '$', sauce2),
      ])
        .then(() => console.log("Data saved"))
        .catch((error) => {
          console.log(error);
        });
    }
  })
  .catch((error) => console.log(error));

/* Middleware */

/* Adding security headers */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

/* Adding CORS Headers */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

/* Acquiring Query Body Data in JSON Format */
app.use(json());

/* User login */
app.use("/api/auth", webUser);

/* Access to sauces */
app.use("/api/sauces", sauce);

/* Image path */
app.use("/images", express.static(path.join(__dirname, "images")));

/* Error handling */
app.use((error, req, res, next) => {
  console.log(error)
});

export default app;
