const mongoose = require('mongoose');

const bibliotecaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    descripcion: { type: String }, // Ajusta según tus necesidades
    imagen: { type: String, required: true },
    fecha: { type: Date, required: true },
});

module.exports = mongoose.model('Biblioteca', bibliotecaSchema);
