import Sauce from "../models/sauce.js";

import { Error } from "mongoose";

/* Show sauces */
export function getAllSauces(req, res, next) {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
}

/* Show selected sauce */
export function getOneSauce(req, res, next) {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      if (error instanceof Error.CastError) {
        res.status(400).json({ error: "Invalid syntax" });
      } else {
        res.status(500).json({ error });
      }
    });
}

/* Add a sauce */
export function addSauce(req, res, next) {
  const newSauce = JSON.parse(req.body.sauce);

  delete newSauce._id;

  delete newSauce.userId;

  const sauce = new Sauce({
    ...newSauce,
    userId: req.authentification.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  sauce
    .validate()
    .then(() => {
      sauce
        .save()
        .then(() => {
          res.status(201).json({ message: "Your sauce is added !" });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      if (error instanceof Error.ValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error });
      }
    });
}

/* Modify a sauce */
export async function changeSauce(req, res, next) {
  try {
    const changedSauce = req.file
      ? {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        }
      : { ...req.body };

    delete changedSauce._id;

    delete changedSauce.userId;

    const sauce = await Sauce.findOne({ _id: req.params.id });
    if (sauce.userId !== req.authentification.userId) {
      res.status(403).json({ message: "You can't change this sauce !" });
    } else {
      req.image = {
        url: sauce.imageUrl,
      };

      const updatedSauce = await Sauce.updateOne(
        { _id: req.params.id },
        { ...changedSauce, userId: req.authentification.userId },
        { runValidators: true },
      );
      if (updatedSauce) {
        res.status(200).json({ message: "Your sauce is updated !" });
      }
    }
    next();
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).json({ error: error.message });
    } else if (error instanceof Error.CastError) {
      res.status(400).json({ error: "Invalid syntax" });
    } else {
      res.status(500).json({ error });
    }
  }
}

/* Delete a sauce */
export async function deleteSauce(req, res, next) {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id });

    if (sauce.userId !== req.authentification.userId) {
      res.status(403).json({ message: "You can't remove this sauce !" });
    } else {
      req.image = {
        url: sauce.imageUrl,
      };
      const deletedSauce = await Sauce.deleteOne({ _id: req.params.id });

      if (deletedSauce) {
        res.status(200).json({ message: "Sauce deleted !" });
      }
    }
    next();
  } catch (error) {
    if (error instanceof Error.CastError) {
      res.status(400).json({ error: "Invalid syntax" });
    } else {
      res.status(500).json({ error });
    }
  }
}

/* Like or dislike a sauce */
export function likeSauce(req, res, next) {
  const likedSauce = { ...req.body };

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      let knownLike;
      for (let userId of sauce.usersLiked) {
        if (userId === req.authentification.userId) {
          knownLike = true;
        }
      }
      let knownDislike;
      for (let userId of sauce.usersDisliked) {
        if (userId === req.authentification.userId) {
          knownDislike = true;
        }
      }

      switch (likedSauce.like) {
        case 1:
          if (!knownLike && !knownDislike) {
            sauce.usersLiked.push(req.authentification.userId);
            Sauce.updateOne(
              { _id: req.params.id },
              { likes: sauce.likes + 1, usersLiked: sauce.usersLiked },
            )
              .then(() => {
                res.status(200).json({ message: "You like sauce !" });
              })
              .catch((error) => {
                if (error instanceof Error.CastError) {
                  res.status(400).json({ error: "Invalid syntax" });
                } else {
                  res.status(500).json({ error });
                }
              });
          }
          break;
        case -1:
          if (!knownLike && !knownDislike) {
            sauce.usersDisliked.push(req.authentification.userId);
            Sauce.updateOne(
              { _id: req.params.id },
              {
                dislikes: sauce.dislikes + 1,
                usersDisliked: sauce.usersDisliked,
              },
            )
              .then(() => {
                res.status(200).json({ message: "You don't like sauce !" });
              })
              .catch((error) => {
                if (error instanceof Error.CastError) {
                  res.status(400).json({ error: "Invalid syntax" });
                } else {
                  res.status(500).json({ error });
                }
              });
          }
          break;
        case 0:
          if (knownLike) {
            for (let index in sauce.usersLiked) {
              if (sauce.usersLiked[index] === req.authentification.userId) {
                sauce.usersLiked.splice(index, 1);
                sauce.likes = sauce.likes - 1;
              }
            }
          }

          if (knownDislike) {
            for (let index in sauce.usersDisliked) {
              if (sauce.usersDisliked[index] === req.authentification.userId) {
                sauce.usersDisliked.splice(index, 1);
                sauce.dislikes = sauce.dislikes - 1;
              }
            }
          }

          Sauce.updateOne(
            { _id: req.params.id },
            {
              likes: sauce.likes,
              dislikes: sauce.dislikes,
              usersLiked: sauce.usersLiked,
              usersDisliked: sauce.usersDisliked,
            },
          )
            .then(() => {
              res.status(200).json({ message: "Do you like sauce ?" });
            })
            .catch((error) => {
              if (error instanceof Error.CastError) {
                res.status(400).json({ error: "Invalid syntax" });
              } else {
                res.status(500).json({ error });
              }
            });
          break;
      }
    })
    .catch((error) => {
      if (error instanceof Error.CastError) {
        res.status(400).json({ error: "Invalid syntax" });
      } else {
        res.status(500).json({ error });
      }
    });
}
