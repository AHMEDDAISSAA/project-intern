const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true }  // index pour l'optimisation
}, { timestamps: true }); // ajoute createdAt/updatedAt automatiquement

module.exports = mongoose.model('Item', itemSchema);