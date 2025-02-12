const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/BuddlDataBase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Route pour les ventes
app.get('/data', async (req, res) => {
  try {
    const data = await db.collection('Ventes').find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour les produits
app.get('/produits', async (req, res) => {
  try {
    const data = await db.collection('Produits').find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});