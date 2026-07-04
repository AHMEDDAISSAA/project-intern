const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/internDB');
    console.log('MongoDB connecté ');
  } catch (err) {
    console.error('Erreur de connexion MongoDB :', err);
  }
}

await mongoose.connect(process.env.MONGO_URI);

module.exports = connectDB;