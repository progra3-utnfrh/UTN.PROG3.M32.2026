const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// Pool de conexiones al motor MySQL
const pool = mysql.createPool({
  host: '127.0.0.1',  //igual a localhost.
  user: 'prog3',
  password: 'admin123',
  database: 'datos',
  waitForConnections: true,
  connectionLimit: 10
});
// Endpoint expuesto en /api/base/
app.get('/api/base/', (req, res) => {
 /*promesa*/ pool.query('SELECT id, descripcion, marca, stock FROM productos01')
    .then(([rows]) => {
      
        console.log ("Conectando con: ", mysql.host );
        console.log(" ------ Vista en tabla --------------");
        console.table(rows);


      res.json({
        status: 'success',
        data: rows
      });
    })
    .catch(err => {
      console.error('Error al consultar productos01:', err.message);
      res.status(500).json({
        status: 'error',
        message: 'Error al consultar la base de datos'
      });
    });
});


app.get('/descri', (req, res) => {
     pool.query('SELECT descripcion, stock FROM productos01')
    .then(([rows]) => {
      
        console.log(" ------ Vista en tabla --------------");
        console.table(rows);


      res.json({
        status: 'success',
        data: rows
      });
    })
    .catch(err => {
      console.error('Error al consultar productos01:', err.message);
      res.status(500).json({
        status: 'error',
        message: 'Error al consultar la base de datos'
      });
    });
});


app.get('/estoc', (req, res) => {
     pool.query('SELECT descripcion, stock FROM productos01')
    .then(([rows]) => {
      
        console.log(" ------ Vista en tabla --------------");
        console.table(rows);


      res.json({
        status: 'success',
        data: rows
      });
    })
    .catch(err => {
      console.error('Error al consultar productos01:', err.message);
      res.status(500).json({
        status: 'error',
        message: 'Error al consultar la base de datos'
      });
    });
});






app.listen(3000, '0.0.0.0', () => {
  console.log('>>> API escuchando en el puerto 3000 (ruta /api/base/)');
});