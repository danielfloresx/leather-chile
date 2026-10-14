const db = require('../config/database');

// Listar productos del catálogo público
exports.listar = async (req, res) => {
  try {
    const [productos] = await db.execute(
      'SELECT * FROM productos WHERE mostrar_catalogo = TRUE'
    );
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar productos' });
  }
};

// Listar todos los productos para administración
exports.listarTodos = async (req, res) => {
  try {
    const [productos] = await db.execute(
      'SELECT * FROM productos ORDER BY id ASC'
    );
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar productos' });
  }
};

// Agregar producto
exports.crear = async (req, res) => {
  try {
    const {
      nombre, descripcion, precio, categoria, imagen,
      mostrar_catalogo, destacado
    } = req.body;

    if (!nombre || !categoria ||
        !['Hombre', 'Mujer', 'Otros Productos'].includes(categoria) ||
        precio === undefined || !Number.isFinite(Number(precio)) ||
        Number(precio) < 0) {
      return res.status(400).json({
        error: 'Nombre, categoría y precio válido son obligatorios'
      });
    }

    const publico = mostrar_catalogo !== false;
    const esDestacado = publico && destacado === true;

    const [resultado] = await db.execute(
      `INSERT INTO productos
       (nombre, descripcion, precio, categoria, imagen,
        mostrar_catalogo, destacado)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre, descripcion || '', Number(precio), categoria,
        imagen || null, publico, esDestacado
      ]
    );

    res.status(201).json({
      mensaje: 'Producto creado',
      id: resultado.insertId
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Modificar producto
exports.modificar = async (req, res) => {
  try {
    const {
      nombre, descripcion, precio, categoria, imagen,
      mostrar_catalogo, destacado
    } = req.body;

    if (!nombre || !categoria ||
        !['Hombre', 'Mujer', 'Otros Productos'].includes(categoria) ||
        precio === undefined || !Number.isFinite(Number(precio)) ||
        Number(precio) < 0) {
      return res.status(400).json({
        error: 'Datos del producto inválidos'
      });
    }

    const publico = mostrar_catalogo === true;
    const esDestacado = publico && destacado === true;

    const [resultado] = await db.execute(
      `UPDATE productos SET
       nombre = ?, descripcion = ?, precio = ?,
       categoria = ?, imagen = ?,
       mostrar_catalogo = ?, destacado = ?
       WHERE id = ?`,
      [
        nombre, descripcion || '', Number(precio), categoria,
        imagen || null, publico, esDestacado, req.params.id
      ]
    );

    if (!resultado.affectedRows) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar producto' });
  }
};

// Eliminar producto
exports.eliminar = async (req, res) => {
  try {
    const [resultado] = await db.execute(
      'DELETE FROM productos WHERE id = ?',
      [req.params.id]
    );

    if (!resultado.affectedRows) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};