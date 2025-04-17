const express = require('express');
const router = express.Router();
const Stock = require("../models/stockModel");
const authenticateToken = require('../middleware/auth');

router.get("/:ownerId", authenticateToken, async (req, res) => {
    const { ownerId } = req.params;
    try {
        const stocks = await Stock.find({ ownerId });
        return res.status(200).json(stocks);
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
});

router.get("/:ownerId/:stockId", authenticateToken, async (req, res) => {
    const { ownerId, stockId } = req.params;
    try {
        const stock = await Stock.findOne({ownerId, stockId})
        res.json({ exists: !!stock });
    } catch(err){
        res.status(500).json({ message: err.message })
    }
});

router.post("/", authenticateToken, async (req, res) => {
    const {ownerId, stockId} = req.body;
    try {
        const existingStock = await Stock.findOne({ ownerId, stockId });
        if (existingStock) {
            return res.status(409).json({ message: "Stock already exists" });
        }
        const stock = new Stock({ownerId, stockId});
        const newStock = await stock.save();
        return res.status(201).json({
            _id: newStock._id,
            ownerId,
            stockId
        })
    } catch (err){
        return res.status(500).json({message: err.message});
    }
})

router.delete("/:ownerId/:stockId", authenticateToken, async (req, res) => {
    const {ownerId, stockId} = req.params;
    try {
        const stock = await Stock.findOne({ownerId, stockId})
        if (!stock) {
            return res.status(404).json({message: "Item Not Found"})
        } 
        await Stock.deleteOne({_id: stock._id});
        return res.status(204).send();
    } catch(err){
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router;