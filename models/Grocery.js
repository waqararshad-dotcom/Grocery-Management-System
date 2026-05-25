const mongoose = require('mongoose');
const GrocerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., Fruits, Vegetables, Dairy
    description: { type: String, required: true }
});
module.exports = mongoose.model('Grocery', GrocerySchema);