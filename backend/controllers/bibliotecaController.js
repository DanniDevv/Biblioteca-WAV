const Biblioteca = require('../models/biblioteca');


// Obtener todos los elementos
exports.getBibliotecas = (req, res) => {
    Biblioteca.find()
        .then((bibliotecas) => {
            res.json(bibliotecas);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};


// Obtener un elemento por su ID
exports.getBibliotecaById = (req, res) => {
    Biblioteca.findById(req.params.id)
        .then((biblioteca) => {
            if (!biblioteca) {
                return res.status(404).json({ message: 'Elemento no encontrado' });
            }
            res.json(biblioteca);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// Crear un nuevo elemento
exports.createBiblioteca = (req, res) => {
    const newBiblioteca = new Biblioteca({
        title: req.body.title,
        description: req.body.description,
        imagen: req.body.imagen,
        fecha: req.body.fecha,
        // Otros campos que desees para tu modelo
    });
    newBiblioteca.save()
        .then((biblioteca) => {
            res.status(201).json(biblioteca);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};


// Actualizar un elemento existente
exports.updateBiblioteca = (req, res) => {
    Biblioteca.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((biblioteca) => {
            if (!biblioteca) {
                return res.status(404).json({ message: 'Elemento no encontrado' });
            }
            res.json(biblioteca);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// Eliminar un elemento existente
exports.deleteBiblioteca = (req, res) => {
    Biblioteca.findByIdAndDelete(req.params.id)
        .then((biblioteca) => {
            if (!biblioteca) {
                return res.status(404).json({ message: 'Elemento no encontrado' });
            }
            res.json({ message: 'Elemento eliminado correctamente' });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};
