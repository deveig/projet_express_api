const Sauce = require('../models/sauce');

const imageFileSystem = require('fs');

/* Delete image */
module.exports = async (req, res, next) => {
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
                    const filename = req.image.url.split('/images/')[1];
                    imageFileSystem.unlink(`images/${filename}`, () => {
                    });
                }
            }
        } 
    } 
    catch (error) {
        res.status(500).json({ error });
    }
}