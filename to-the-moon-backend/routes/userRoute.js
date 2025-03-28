const express = require('express');
const router = express.Router();
const { User, validate } = require("../models/userModel");
const dotenv = require('dotenv');
const joi = require("joi");

const { compare, genSalt, hash } = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message});
        }
        const exists = await User.findOne({ email: req.body.email });
        if(exists){
            return res.status(409).send({message: "Email already has an existing account!"});
        }
        dotenv.config();
        const salt = await genSalt(Number(process.env.SALT));
        const hashedPassword = await hash(req.body.password, salt);
        await new User({ ...req.body, password: hashedPassword}).save();
        res.status(201).send({message: "User Created Successfully!"});

    } catch (err){
        res.status(500).send({message: err.message})
    }
});

router.post("/login", async (req, res) => {
    try {
        const { error } = loginValidate(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message});
        }
        const user = await User.findOne({email: req.body.email});
        const validPassword = await compare(req.body.password, user.password);
        if(!user || !validPassword){
            return res.status(401).send({message: "Invalid email or password"});
        }
        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Logged In Successfully!"});
    } catch (err) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

const loginValidate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    });
    return schema.validate(data);
}


router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const users = await User.find({_id: id});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;