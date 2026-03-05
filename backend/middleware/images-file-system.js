import getClient from "../connection.js";
import { unlink } from "fs";

/* Delete image */
export default async (req, res, next) => {
  try {
    const client = await getClient();
    if (req.image.url) {
      let usedImage;
      const reqUrl = req.image.url;
      const sauces = await client.ft.search(
        "idx:sauces",
        `@imageUrl:${reqUrl.slice("http://localhost:3000/images/".length)}`,
      );
      if (sauces.documents.filter((sauce) => sauce.value.imageUrl === req.image.url).length > 0) {
        usedImage = true;
      }
      if (!usedImage) {
        const filename = reqUrl.split("/images/")[1];
        unlink(`images/${filename}`, () => {});
      }
    }
  } catch (error) {
    console.log(error)
  }
};
