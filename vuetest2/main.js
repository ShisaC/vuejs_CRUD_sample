const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
// app.use(express.json());
mongoose.connect('mongodb+srv://shisachhotray:hello123@cluster0.xi2rzqv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const itemSchema = new mongoose.Schema({
  msg: String
});

const Item = mongoose.model('Item', itemSchema);

app.use(bodyParser.json());

// Create
app.post('/api/items', async (req, res) => {
  const newItem = new Item({ msg: req.body.msg });
  await newItem.save();
  res.json(newItem);
});

// Read
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Update
app.put('/api/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, { msg: req.body.msg }, { new: true });
  res.json(updatedItem);
});

// Delete
app.delete('/api/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted successfully' });
});

// Serve static files (Vue app)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
