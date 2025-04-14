const express = require('express');
const router = express.Router();
const { Stock } = require("../models/stockModel");
const dotenv = require('dotenv');

router.get("/:ownerId/:stockId", async (req, res) => {
    const { ownerId, stockId } = req.params;
    try {
        const stock = await Stock.findOne({ownerId, stockId})
        if (stock) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch(err){
        res.status(500).json({ message: err.message })
    }
});

router.post("/", async (req, res) => {
    const {ownerId, stockId} = req.body;

    const stock = new Stock({
        ownerId: ownerId,
        stockId: stockId
    });

    try {
        const newStock = await stock.save();
        res.status(201).json({
            _id: newStock._id,
            ownerId: ownerId,
            stockId: stockId
        })
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router;