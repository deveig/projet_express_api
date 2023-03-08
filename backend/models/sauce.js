const mongoose = require('mongoose');

/**
 * Validate input data and verify it against no injection
 * @param { String } value 
 * @return { Boolean }
 */
const inputValidator = function (value) {
  if (/\d+/.test(value)) {
    return false
  } else {
    if (/[='<>\/]/.test(value)) { 
      return false
    }
  }
};

const sauceSchema = mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: [true, "Please write a name !"], validate: [inputValidator, "Please write a name !"] },
  manufacturer: { type: String, required: [true, "Please write a manufacturer !"], validate: [inputValidator, "Please write a manufacturer !"] },
  description: { type: String, required: [true, "Please write a description !"], validate: [inputValidator, "Please write a description !"] },
  mainPepper: { type: String, required: [true, "Please write the main pepper of the sauce !"], validate: [inputValidator, "Please write the main pepper of the sauce !"] },
  imageUrl: { type: String },
  heat: { type: Number, required: [true, "Value of heat must be between 1 and 10 !"], default: 1, min: [1, "Value of heat must be between 1 and 10 !"], max: [10, "Value of heat must be between 1 and 10 !"] },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] }
});

module.exports = mongoose.model('Sauce', sauceSchema);