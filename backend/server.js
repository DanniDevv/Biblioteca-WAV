const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const bibliotecaController = require('./controllers/bibliotecaController');

const app = express();
const port = 3000;

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de multer para la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.log('Error al conectar a MongoDB:', error);
  });

// Definir rutas para CRUD de Biblioteca
app.get('/api/bibliotecas', bibliotecaController.getBibliotecas);
app.get('/api/bibliotecas/:id', bibliotecaController.getBibliotecaById);
app.post('/api/bibliotecas', bibliotecaController.createBiblioteca);
app.put('/api/bibliotecas/:id', bibliotecaController.updateBiblioteca);
app.delete('/api/bibliotecas/:id', bibliotecaController.deleteBiblioteca);

// Iniciar el servidor
app.listen(port, () => {
  console.log('Servidor backend en funcionamiento en el puerto', port);
});
