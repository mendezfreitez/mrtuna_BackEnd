const mongoose = require('mongoose');
const repartidorEsquema = new mongoose.Schema({
    nom: String,
    dir: String,
    usu: String
});
const unRepartidor = mongoose.model('repartidores', repartidorEsquema);
const repartidor = {
    nuevo: function (req, res) {
        if (req.body.id === '') {
            unRepartidor.create({ nom: req.body.nombre, usu: req.validacion.data.usuario }, function (err) {
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
            unRepartidor.updateOne({ _id: req.body.id }, { nom: req.body.nombre }, function (err, result) {
                if (!err) {
                    res.send({ icono: 'check_circle_outline', mensaje: 'Editado con éxito!', color: 'teal-14' }).status(200)
                }
                else {
                    res.send({ icono: 'error', mensaje: 'No se pudo editar!', color: 'red-4' })
                }
            })
        }
    },
    traerRepartidores: function (req, res) {
        unRepartidor.find({ 'usu': req.validacion.data.usuario }, function (err, result) {
            if (err) {
                res.send({ icono: 'error', mensaje: "El servidor no responde!", color: 'red-4' })
                return
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ icono: 'error', mensaje: "Ningún repartidor agregado aún!", color: 'yellow-14' })
            }
        })
    },
    borrarRepartidor: function (req, res) {
        unRepartidor.deleteOne({ _id: req.body.id }, function (errr, result) {
            if (!errr) {
                res.send({ icono: 'check_circle_outline', mensaje: `Eliminado con éxito!`, color: 'teal-14' }).status(200)
            }
            else {
                res.send({ icono: 'error', mensaje: 'No se pudo eliminar!', color: 'red-4' })
            }
        })
    }
}
module.exports = repartidor;