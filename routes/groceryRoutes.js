const express = require('express');
const router = express.Router();
const Grocery = require('../models/Grocery');

// Add Item
router.post('/add', async (req, res) => {
    try {
        const newItem = new Grocery(req.body);
        const saved = await newItem.save();
        res.status(200).json(saved);
    } catch (err) { res.status(500).json(err); }
});

// Get All Items
router.get('/all', async (req, res) => {
    try {
        const items = await Grocery.find();
        res.status(200).json(items);
    } catch (err) { res.status(500).json(err); }
});

// Delete Item
router.delete('/delete/:id', async (req, res) => {
    try {
        await Grocery.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted");
    } catch (err) { res.status(500).json(err); }
});

// Update Item
router.put('/update/:id', async (req, res) => {
    try {
        const updated = await Grocery.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updated);
    } catch (err) { res.status(500).json(err); }
});

module.exports = router;