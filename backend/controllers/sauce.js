import { getSauceClient, validateSauce } from "../models/sauce.js";
const client = await getSauceClient();
import { config } from "dotenv";
config();
const randomKey = process.env.RANDOM_KEY;

/* Show sauces */
export function getAllSauces(req, res, next) {
  client.ft
    .search("idx:sauces", "*")
    .then((sauces) => {
      res.status(200).json(sauces.documents.map((sauce) => sauce.value));
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
}

/* Show selected sauce */
export function getOneSauce(req, res, next) {
  client.ft
    .search("idx:sauces", `@id:${req.params.id}`)
    .then((sauce) => {
      res.status(200).json(sauce.documents[0].value);
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
}

/* Add a sauce */
export async function addSauce(req, res, next) {
  try {
    // const newSauce = JSON.parse(req.body.sauce);

    // delete newSauce.id;

    // delete newSauce.userId;

    // const sauce = {
    //   ...newSauce,
    //   userId: req.authentification.userId,
    //   imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    // };
    // if (validateSauce(sauce) === false) {
    //   res.status(400).json({
    //     message:
    //       "Invalid syntax, example: 'name: curry, manufacturer: spicy food, description: Sauce très piquante, main pepper: piment, heat: 8'",
    //   });
    // } else {
    //   sauce.id = `${sauce.name.split(" ")[0].split("-")[0].split("_")[0]}`;
    //   const knownSauce = await client.ft.search(
    //     "idx:sauces",
    //     `@id:${sauce.id}`,
    //   );
    //   if (knownSauce.total > 0) {
    //     res.status(400).json({
    //       message: "Sauce already exists (curry, aigre-douce, ...)",
    //     });
    //   } else {
    //     client.json
    //       .set(`sauce:${sauce.id}`, "$", sauce) // encoded id
    //       .then(() => {
    //         res.status(201).json({ message: "Your sauce is added !" });
    //       })
    //       .catch((error) => {
    //         res.status(500).json({ message: "Internal Server Error" });
    //       });
    //   }
    // }
    res.status(400).json({ message: "Portfolio project : no data saved" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/* Modify a sauce */
export async function changeSauce(req, res, next) {
  try {
    // const changedSauce = req.file
    //   ? {
    //       ...JSON.parse(req.body.sauce),
    //       imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    //     }
    //   : { ...req.body };

    // delete changedSauce.id;

    // delete changedSauce.userId;
    // if (validateSauce(changedSauce) === false) {
    //   res.status(400).json({
    //     error:
    //       "Invalid syntax, example: 'name: curry, manufacturer: spicy food, description: Sauce très piquante, main pepper: piment, heat: 8'",
    //   });
    // } else {
    //   // const knownSauce = await client.ft.search("idx:sauces", `@name:${sauce.name}`);
    //   // if (knownSauce.total > 0) {
    //   //   res.status(400).json({
    //   //     message: "Sauce already exists (curry, aigre-douce, ...)",
    //   //   });
    //   // }
    //   const sauce = await client.ft.search(
    //     "idx:sauces",
    //     `@id:${req.params.id}`,
    //   );
    //   if (sauce.documents[0].value.userId !== req.authentification.userId) {
    //     res.status(403).json({ message: "You can't change this sauce !" });
    //   } else {
    //     req.image = {
    //       url: sauce.imageUrl,
    //     };

    //     const updatedSauceName = await client.json.set(
    //       `sauce:${req.params.id}`,
    //       "$.name",
    //       changedSauce.name,
    //     );
    //     const updatedSauceManufacturer = await client.json.set(
    //       `sauce:${req.params.id}`,
    //       "$.manufacturer",
    //       changedSauce.manufacturer,
    //     );
    //     const updatedSauceDescription = await client.json.set(
    //       `sauce:${req.params.id}`,
    //       "$.description",
    //       changedSauce.description,
    //     );
    //     const updatedSauceImage = await client.json.set(
    //       `sauce:${req.params.id}`,
    //       "$.imageUrl",
    //       changedSauce.imageUrl,
    //     );
    //     const updatedSauceMainPepper = await client.json.set(
    //       `sauce:${req.params.id}`,
    //       "$.mainPepper",
    //       changedSauce.mainPepper,
    //     );
    //     const updatedSauceHeat = await client.json.set(
    //       `sauce:${req.params.id}`,
    //       "$.heat",
    //       changedSauce.heat,
    //     );
    //     const updatedSauceUserId = await client.json.set(
    //       `sauce:${req.params.id}`,
    //       "$.userId",
    //       req.authentification.userId,
    //     );

    //     //   ...changedSauce,
    //     //   userId: req.authentification.userId,
    //     // })

    //     if (
    //       updatedSauceName &&
    //       updatedSauceManufacturer &&
    //       updatedSauceDescription &&
    //       updatedSauceImage &&
    //       updatedSauceMainPepper &&
    //       updatedSauceHeat &&
    //       updatedSauceUserId
    //     ) {
    //       res.status(200).json({ message: "Your sauce is updated !" });
    //     }
    //   }
    // }
    res.status(400).json({ message: "Portfolio project : no data saved" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/* Delete a sauce */
export async function deleteSauce(req, res, next) {
  try {
    // const sauce = await client.json.get(`sauce:${req.params.id}`);

    // if (sauce.userId !== req.authentification.userId) {
    //   res.status(403).json({ message: "You can't remove this sauce !" });
    // } else {
    //   req.image = {
    //     url: sauce.imageUrl,
    //   };
    //   const deletedSauce = await client.json.del(`sauce:${req.params.id}`, "$");

    //   if (deletedSauce) {
    //     res.status(200).json({ message: "Sauce deleted !" });
    //   }
    // }
    // next();
    res.status(400).json({ message: "Portfolio project : no data saved" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/* Like or dislike a sauce */
export function likeSauce(req, res, next) {
  try {
    const likedSauce = { ...req.body };
    client.json
      .get(`sauce:${req.params.id}`)
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
              client.json
                .set(`sauce:${req.params.id}`, "$", {
                  ...sauce,
                  likes: sauce.likes + 1,
                  usersLiked: sauce.usersLiked,
                })
                .then(() => {
                  res.status(200).json({ message: "You like sauce !" });
                })
                .catch((error) => {
                  res.status(500).json({ message: "Internal Server Error" });
                });
            }
            break;
          case -1:
            if (!knownLike && !knownDislike) {
              sauce.usersDisliked.push(req.authentification.userId);
              client.json
                .set(`sauce:${req.params.id}`, "$", {
                  ...sauce,
                  dislikes: sauce.dislikes + 1,
                  usersDisliked: sauce.usersDisliked,
                })
                .then(() => {
                  res.status(200).json({ message: "You don't like sauce !" });
                })
                .catch((error) => {
                  res.status(500).json({ message: "Internal Server Error" });
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
                if (
                  sauce.usersDisliked[index] === req.authentification.userId
                ) {
                  sauce.usersDisliked.splice(index, 1);
                  sauce.dislikes = sauce.dislikes - 1;
                }
              }
            }

            client.json
              .set(`sauce:${req.params.id}`, "$", sauce)
              .then(() => {
                res.status(200).json({ message: "Do you like sauce ?" });
              })
              .catch((error) => {
                res.status(500).json({ message: "Internal Server Error" });
              });
            break;
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
