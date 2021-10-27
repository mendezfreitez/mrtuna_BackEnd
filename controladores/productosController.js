const mongoose = require('mongoose');
const productoEsquema = new mongoose.Schema({
    nemo: String,
    nom: String,
    tipo: String,
    prec: String,
    cost: String,
    util: Number,
    cant: Number,
    comi: String,
    usu: String,
    stk: Number
});
const unProducto = mongoose.model('productos', productoEsquema);
const productos = {
    productos: function (req, res) {
        if (req.body.id === '') {
            unProducto.find({ nemo: req.body.nemo.toUpperCase() }, function (err, result) {
                if (result.length > 0) {
                    res.send({ icono: 'error', mensaje: 'Ya existe un producto con esta NEMO!', color: 'yellow-14' })
                    return
                }
                else {
                    unProducto.create({
                        nemo: req.body.nemo.toUpperCase(),
                        nom: req.body.producto.toUpperCase(),
                        tipo: req.body.tipoProducto,
                        prec: req.body.precio,
                        cost: req.body.costo,
                        comi: req.body.porcComision,
                        cant: req.body.cantidad,
                        usu: req.validacion.data.usuario
                    }, function (err) {
                        if (!err) {
                            res.send({ icono: 'check_circle_outline', mensaje: 'Guardado con éxito!', color: 'teal-14' })
                        }
                        else {
                            console.log(err)
                            res.send({ icono: 'error', mensaje: 'No se pudo guardar!', color: 'red-4' })
                        }
                    })
                }
            });
        }
        else {
            unProducto.updateOne({ _id: req.body.id }, {
                nemo: req.body.nemo.toUpperCase(),
                nom: req.body.producto.toUpperCase(),
                tipo: req.body.tipoProducto,
                prec: req.body.precio,
                cost: req.body.costo,
                comi: req.body.porcComision,
                cant: req.body.cantidad
             }, function (err, result) {
                if (!err) {
                    res.send({ icono: 'check_circle_outline', mensaje: 'Editado con éxito!', color: 'teal-14' }).status(200)
                }
                else {
                    res.send({ icono: 'error', mensaje: 'No se pudo editar!', color: 'red-4' })
                }
            });
        }
    },
    listaProductos: function (req, res) {
        unProducto.find(function (err, result) {
            if (err) {
                res.send({ icono: 'error', mensaje: "El servidor no responde!", color: 'red-4' })
                return
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ icono: 'error', mensaje: "Ningún producto agregado aún!", color: 'yellow-14' })
            }
        })
    },
    borrarProducto: function (req, res) {
        unProducto.deleteOne({ _id: req.body.id }, function (err, result) {
            if (!err) {
                res.send({ icono: 'check_circle_outline', mensaje: `Eliminado con éxito!`, color: 'teal-14' }).status(200)
            }
            else {
                res.send({ icono: 'error', mensaje: 'No se pudo eliminar!', color: 'red-4' })
            }
        })
    },
    setStock: function (req, res) {
        unProducto.find({ nemo: req.body.nemo.toUpperCase() }, function (err, result) {
            if (result.length > 0) {
                unProducto.updateOne({ nemo: req.body.nemo }, { stk: req.body.stk }, function (err, result) {
                    if (!err) {
                        res.send({ icono: 'check_circle_outline', mensaje: 'Stock editado!', color: 'teal-14' }).status(200)
                    }
                    else {
                        res.send({ icono: 'error', mensaje: 'No se pudo editar!', color: 'red-4' })
                    }
                });
            }
            else {
                res.send({ icono: 'error', mensaje: 'No se encontró el producto!', color: 'red-4' })
            }
        });
    },
    // set: (req, res) => {
    //     unProducto.updateMany({}, { $set:{stk: 10} }, function(){
    //         res.send('<h3 style="font-size:50px; font-family: Arial; text-align:center; padding-top:100px; color:#00897b;">Cambio Exitoso!!!</h3>')
    //     })
    // }
}
module.exports = productos;