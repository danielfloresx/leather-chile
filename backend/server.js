require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const productosRoutes = require('./routes/productos.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint de comprobación
app.get('/api/estado', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({
      mensaje: 'API Leather Chile funcionando',
      baseDatos: 'Conectada'
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'API iniciada, pero MySQL no está disponible'
    });
  }
});

app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Leather Chile en http://localhost:${PORT}`);
});
