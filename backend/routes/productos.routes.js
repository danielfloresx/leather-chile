const express = require('express');
const router = express.Router();
const productos = require('../controllers/productos.controller');

router.get('/', productos.listar);
router.get('/admin', productos.listarTodos);
router.post('/', productos.crear);
router.put('/:id', productos.modificar);
router.delete('/:id', productos.eliminar);

module.exports = router;
