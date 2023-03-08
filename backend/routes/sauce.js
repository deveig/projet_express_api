const express = require('express');

const router = express.Router();

const authentification = require('../middleware/authentification');

const image = require('../middleware/multer-config');

const sauceManagement = require('../controllers/sauce');

const deleteImage = require('../middleware/images-file-system');

/* Show sauces */
router.get('/', authentification, sauceManagement.getAllSauces);

/* Show selected sauce */
router.get('/:id', authentification, sauceManagement.getOneSauce);

/* Add a sauce */
router.post('/', authentification, image, sauceManagement.addSauce);

/* Modify a sauce */
router.put('/:id', authentification, image, sauceManagement.changeSauce, deleteImage);

/* Delete a sauce */
router.delete('/:id', authentification, sauceManagement.deleteSauce, deleteImage);

/* Like or dislike a sauce */
router.post('/:id/like', authentification, sauceManagement.likeSauce);

module.exports = router;