const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const dotenv = require('dotenv');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },

        password: {
            type: String,
            require: true
        },

        fName: {
            type: String,
            require: true
        },

        lName: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.methods.generateAuthToken = function() {
    dotenv.config();
    const token = jwt.sign({_id:this._id}, process.env.JWT_KEY, { expiresIn: "7d" });
    return token;
}

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