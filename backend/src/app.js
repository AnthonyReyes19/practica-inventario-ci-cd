const express = require('express');
const cors = require('cors');
// Importamos TODAS las funciones aquí (una sola vez)
const { crearProducto, listarProductos, actualizarProducto } = require('./inventoryService');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Ruta para Listar productos
app.get('/api/productos', (req, res) => {
    const items = listarProductos();
    res.json({ data: items });
});

// 2. Ruta para Crear producto
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

// 3. Ruta para Editar producto (La que agregamos para la actividad)
app.put('/api/productos/:id', (req, res) => {
    try {
        const actualizado = actualizarProducto(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ data: actualizado });
    } catch (err) {
        res.status(400).json({
            error: 'VALIDATION_ERROR',
            message: err.message
        });
    }
});

// 4. Ruta de Versión (Actividad 1)
app.get('/api/version', (req, res) => {
    res.json({
        version: '1.0.0',
        name: 'Inventario API',
        environment: process.env.NODE_ENV || 'development'
    });
});

module.exports = app;