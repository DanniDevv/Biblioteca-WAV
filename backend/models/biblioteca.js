const mongoose = require('mongoose');

const bibliotecaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    descripcion: { type: String },
    imagenPath: { type: String }, // Nuevo campo para la ruta de la imagen
    fecha: { type: Date, required: true },
});

module.exports = mongoose.model('Biblioteca', bibliotecaSchema);
