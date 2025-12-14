const express = require('express');
const cors = require('cors');
const { crearProducto, listarProductos } = require('./inventoryService');

const app = express();

app.use(cors()); // Habilita CORS
app.use(express.json()); // Necesario para procesar JSON

// Listar productos
app.get('/api/productos', (req, res) => {
    const items = listarProductos();
    res.json({ data: items });
});

// Crear producto
app.post('/api/productos', (req, res) => {
    try {
        const nuevo = crearProducto(req.body);
        res.status(201).json({ data: nuevo });
    } catch (err) {
        res.status(400).json({
            error: 'VALIDATION_ERROR',
            message: err.message
        });
    }
});

// Actividad 1: Ruta de versión
app.get('/api/version', (req, res) => {
    res.json({
        version: '1.0.0',
        name: 'Inventario API',
        environment: process.env.NODE_ENV || 'development'
    });
});
module.exports = app;