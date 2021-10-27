const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const validarToken = require('../controladores/token');
const usuarioController = require('../controladores/usuarioController');
const clientesController = require('../controladores/clientesController');
const repartidorController = require('../controladores/repartidorController');
const productosController = require('../controladores/productosController');
const ventasController = require('../controladores/ventasController');

/////////////////// USUARIOS ///////////////////
router.post('/registro', usuarioController.registro);
router.post('/login', usuarioController.login);
router.get('/permisos', usuarioController.permisos);
router.post('/setPermiso', usuarioController.setPermiso);

/////////////////// CLIENTES ///////////////////
router.get('/traerClientes', validarToken, clientesController.traerClientes);
router.post('/nuevoMercado', validarToken,  clientesController.nuevoCliente);
router.post('/borrarCliente', validarToken, clientesController.borrarCliente);
// router.get('/setCliente', clientesController.set);

///////////////// REPARTIDORES /////////////////
router.post('/repartidores', validarToken, repartidorController.nuevo);
router.get('/traerRepartidores', validarToken, repartidorController.traerRepartidores);
router.post('/borrarRepartidor', validarToken, repartidorController.borrarRepartidor);

//////////////////  PRODUCTOS //////////////////
router.post('/productos', validarToken, productosController.productos);
router.get('/listaProductos', validarToken, productosController.listaProductos);
router.post('/borrarProducto', validarToken, productosController.borrarProducto);
router.post('/setStock', validarToken, productosController.setStock);
// router.get('/setProducto', productosController.set);

//////////////////   VENTAS   //////////////////
router.post('/ventas', validarToken, ventasController.ventas);
router.get('/listaVentas', validarToken, ventasController.listaVentas);
router.post('/borrarVenta', validarToken, ventasController.borrarVenta);
router.post('/cambioStatus', validarToken, ventasController.cambioStatus);

module.exports = router;