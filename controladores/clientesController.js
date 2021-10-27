const mongoose = require('mongoose');
const clienteEsquema = new mongoose.Schema({
    nom: String,
    dir: String,
    usu: String,
    fono: String
});
const unCliente = mongoose.model('clientes', clienteEsquema);
const clientes = {
    traerClientes: function (req, res) {
        unCliente.find({ 'usu': req.validacion.data.usuario }, function (err, result) {
            if (err) {
                res.send({ icono: 'error', mensaje: "El servidor no responde!", color: 'red-4' })
                return
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ icono: 'error', mensaje: "Ningún cliente agregado aún!", color: 'yellow-14' })
            }
         })
    },
    nuevoCliente: function (req, res) {
        if (req.body.id === '') {
            unCliente.create({ nom: req.body.nombre, dir: req.body.direccion, usu: req.validacion.data.usuario, fono: req.body.fono }, function (err) {
                if (!err) {
                    res.send({ icono: 'check_circle_outline', mensaje: 'Guardado con éxito!', color: 'teal-14' })
                }
                else {
                    console.log(err)
                    res.send({ icono: 'error', mensaje: 'No se pudo guardar!', color: 'red-4' })
                }
            })
        }
        else {
            unCliente.updateOne({ _id: req.body.id }, { nom: req.body.nombre, dir: req.body.direccion, fono: req.body.fono }, function (err, result) {
                if (!err) {
                    res.send({ icono: 'check_circle_outline', mensaje: 'Editado con éxito!', color: 'teal-14' }).status(200)
                }
                else {
                    res.send({ icono: 'error', mensaje: 'No se pudo editar!', color: 'red-4' })
                }
            })
        }
    },
    borrarCliente: function (req, res) {
        unCliente.deleteOne({ _id: req.body.id }, function (errr, result) {
            if (!errr) {
                res.send({ icono: 'check_circle_outline', mensaje: `Eliminado con éxito!`, color: 'teal-14' }).status(200)
            }
            else {
                res.send({ icono: 'error', mensaje: 'No se pudo eliminar!', color: 'red-4' })
            }
        })
    },
    // set: (req, res) => {
    //     unCliente.updateMany({}, { $set:{fono: ''} }, function(){
    //         res.send('<h3 style="font-size:50px; font-family: Arial; text-align:center; padding-top:100px; color:#00897b;">Cambio Exitoso!!!</h3>')
    //     })
    // }
}
module.exports = clientes;