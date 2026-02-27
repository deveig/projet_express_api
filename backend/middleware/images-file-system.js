import Sauce from "../models/sauce.js";

import { unlink } from "fs";

/* Delete image */
export default async (req, res, next) => {
  try {
    if (req.image.url) {
      let usedImage;
      const sauces = await Sauce.find();
      if (sauces) {
        for (let sauce of sauces) {
          if (sauce.imageUrl === req.image.url) {
            usedImage = true;
          }
        }
        if (!usedImage) {
          const filename = req.image.url.split("/images/")[1];
          unlink(`images/${filename}`, () => {});
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
