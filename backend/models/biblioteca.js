const mongoose = require('mongoose');

const bibliotecaSchema = new mongoose.Schema({
    title: { type: String, require: true },
    descripcion: { type: String, require: true },
    imagen: { type: String, require: true },
    fecha: { type: Date, require: true },
});

module.exports = mongoose.model('Biblioteca', bibliotecaSchema);