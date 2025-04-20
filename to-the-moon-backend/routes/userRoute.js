const express = require('express');
const router = express.Router();
const { User, validate } = require("../models/userModel");
const joi = require("joi");
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');

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
        const salt = await genSalt(Number(process.env.SALT));
        const hashedPassword = await hash(req.body.password, salt);
        await new User({ ...req.body, password: hashedPassword}).save();
        res.status(201).send({message: "User Created Successfully!"});
    } catch (err){
        res.status(500).send({message: "Internal Server Error. Please try again later"})
    }
});

router.post("/login", async (req, res) => {
    try {
        const { error } = loginValidate(req.body);
        if(error){
            return res.status(400).send({message: error.details[0].message});
        }
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(401).send({message: "Invalid email or password"});
        }
        const validPassword = await compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(401).send({message: "Invalid email or password"});
        }
        const token = user.generateAuthToken();
        const decoded = jwt.decode(token);
        res.status(200).send({data: token, id: user._id, expiresAt: decoded.exp * 1000, message: "Logged In Successfully!"});
    } catch (err) {
        console.error("Login error:", err);
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
        const user = await User.find({_id: id});
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, password, lName, fName } = req.body;

    // Define validation schema for partial update
    const schema = joi.object({
        email: joi.string().email().optional().label("Email"),
        password: passwordComplexity().optional().label("Password"),
        fName: joi.string().optional().label("First Name"),
        lName: joi.string().optional().label("Last Name"),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        const updateFields = {};

        if (email) updateFields.email = email;
        if (fName) updateFields.fName = fName;
        if (lName) updateFields.lName = lName;
        if (password) {
            const salt = await genSalt(Number(process.env.SALT));
            updateFields.password = await hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedUser) return res.status(404).send({ message: 'User not found' });

        res.status(200).send({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        res.status(500).send({ message: "Failed to update user", error: err.message });
    }
});

module.exports = router;