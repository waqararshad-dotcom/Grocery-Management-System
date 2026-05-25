const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/GroceryMaxDB')
    .then(() => console.log("✅ DB Connected"))
    .catch(err => console.log(err));

const ItemSchema = new mongoose.Schema({ name: String, price: Number, category: String });
const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/api/items/all', async (req, res) => { res.json(await Item.find()); });
app.post('/api/items/add', async (req, res) => { await new Item(req.body).save(); res.send("Added!"); });
app.delete('/api/items/delete/:id', async (req, res) => { await Item.findByIdAndDelete(req.params.id); res.send("Deleted!"); });

app.listen(5000, () => console.log("🚀 Server running on 5000"));