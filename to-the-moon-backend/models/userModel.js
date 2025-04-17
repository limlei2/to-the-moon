const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        fName: {
            type: String,
            required: true
        },

        lName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
      { _id: this._id },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );
  };

const User = mongoose.model("User", userSchema);

const validate = (data) => {
    const schema = joi.object({
        fName: joi.string().required().label("First Name"),
        lName: joi.string().required().label("Last Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
}

module.exports = { User, validate };