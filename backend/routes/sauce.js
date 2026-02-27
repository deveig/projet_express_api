import express from 'express';

const router = express.Router();

import authentification from '../middleware/authentification.js';

import image from '../middleware/multer-config.js';

import { getAllSauces, getOneSauce, addSauce, changeSauce, deleteSauce, likeSauce } from '../controllers/sauce.js';

import deleteImage from '../middleware/images-file-system.js';

/* Show sauces */
router.get('/', authentification, getAllSauces);

/* Show selected sauce */
router.get('/:id', authentification, getOneSauce);

/* Add a sauce */
router.post('/', authentification, image, addSauce);

/* Modify a sauce */
router.put('/:id', authentification, image, changeSauce, deleteImage);

/* Delete a sauce */
router.delete('/:id', authentification, deleteSauce, deleteImage);

/* Like or dislike a sauce */
router.post('/:id/like', authentification, likeSauce);

export default router;