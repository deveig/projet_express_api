const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

/**
 * Validate input data and verify it against no injection
 * @param { String } value 
 * @return { Boolean }
 */
const passwordValidator = function(value) {
  if (value.length >= 8 && /\d+/.test(value) && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[_:@!]/.test(value)) {
    if (/[='<>\/]/.test(value)) {
      return false
    } 
  } else {
    return false
  }
};

/**
 * Verify input data against no injection 
 * @param { String } value 
 * @return { Boolean }
 */
const noInjection = function (value) {
  if (/[='<>\/]/.test(value)) { 
    return false
  } 
};


const userSchema = mongoose.Schema({
  email: { type: String, required: [true, "Your email must be in the form example@example.com"], match: [/\w+@\w+\.\w+/, "Your email must be in the form example@example.com"], validate: { validator: noInjection, message: "Votre email doit être sous la forme exemple@exemple.com" }, unique: true , uniqueCaseInsensitive: true },
  password: { type: String, required: [true, ], validate: { validator: passwordValidator, message: "Your password must contain at least one number, one special character (:,@,!,_), one uppercase, and one lowercase" } }, 
});

userSchema.plugin(uniqueValidator, { message: "Syntax error" }); 

module.exports = mongoose.model('User', userSchema);