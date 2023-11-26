const Biblioteca = require('../models/biblioteca');

const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
  });
  const upload = multer({ storage: storage });

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

// Modifica el controlador de creación para manejar la carga de archivos
exports.createBiblioteca = (req, res) => {
    const newBiblioteca = new Biblioteca({
        title: req.body.title,
        descripcion: req.body.descripcion,
        imagenPath: req.file ? req.file.path : '', // Almacena la ruta del archivo multimedia
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


// Modifica el controlador de actualización para manejar la carga de archivos
exports.updateBiblioteca = (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body); // Agrega esta línea para depurar
    
    const updateData = {
        title: req.body.title,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        // Otros campos que desees para tu modelo
    };

    if (req.file) {
        updateData.imagenPath = req.file.path;
    }

    Biblioteca.findByIdAndUpdate(req.params.id, updateData, { new: true })
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
