import {
  getUserClient,
  passwordValidator,
  noInjection,
} from "../models/user.js";
const client = await getUserClient();
import { hash, compare } from "bcrypt";

import jwt from "jsonwebtoken";

import { config } from "dotenv";
config();
const randomKey = process.env.RANDOM_KEY;
/* Create a user account and hashes the password */
export function signup(req, res, next) {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  if (passwordValidator(user.password) === false || user.password === "") {
    return res.status(400).json({
      message:
        "Your password must contain 8 caracters with at least one number, one special character (:,@,!,_), one uppercase, and one lowercase",
    });
  } else if (
    noInjection(user.email) === false ||
    /\w+@\w+\.\w+/.test(user.email) === false ||
    user.email === ""
  ) {
    return res
      .status(400)
      .json({ message: "Your email must be in the form example@example.com" });
  } else {
    user.email = req.body.email.replace("@", "")
    client.ft
      .search("idx:users", `@email:${user.email}`)
      .then((user) => {
        if (user.documents[0].value.email == user.email) {
          res.status(409).json({ message: "Email already exists" });
        }
      })
      .catch(() => {
        hash(req.body.password, 10)
          .then((passwordHash) => {
            user.password = passwordHash;
            client.json
              .set(`user:${user.email}`, "$", user) // `encoded id`, '$', user
              .then(() => {
                res.status(201).json({ message: "Your account is created !" });
              })
              .catch((error) => {
                res.status(500).json({ message: "Internal Error Server" });
              });
          })
          .catch((error) => {
            res.status(500).json({ message: "Internal Error Server" });
          });
      });
  }
}

/* Check the user's email and password and return the user's id and a token */
export function login(req, res, next) {
  client.ft
    .search("idx:users", `@email:${req.body.email.replace("@", "")}`)
    .then((user) => {
      compare(req.body.password, user.documents[0].value.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Your password is invalid !" });
          }
          res.status(200).json({
            userId: user.documents[0].id,
            token: jwt.sign({ userId: user.documents[0].id }, randomKey, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => {
          res.status(500).json({ message: "Internal Error Server" });
        });
    })
    .catch((error) => {
      return res.status(401).json({ message: "Your email is invalid !" });
    });
}
