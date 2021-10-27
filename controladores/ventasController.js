const mongoose = require('mongoose');
const ventaEsquema = new mongoose.Schema({
    nom: String,
    dir: String,
    mes: String,
    sem: String,
    ddesp: String,
    rep: String,
    prods: Array,
    usu: String,
    stat: Array,
    tot: Number,
    apenv: Boolean,
    desc: Number,
    porcdesc: Boolean
});
const unaVenta = mongoose.model('ventas', ventaEsquema);
const ventas = {
    ventas: function (req, res) {
        if (req.body.id === '') {
            unaVenta.create({
                nom: req.body.nombre,
                dir: req.body.direccion,
                mes: req.body.mes.label,
                sem: req.body.semana.label,
                ddesp: req.body.diaDespacho,
                rep: req.body.repartidor,
                prods: req.body.productos,
                usu: req.validacion.data.usuario,
                stat: [false, false],
                tot: req.body.total,
                apenv: req.body.apEnvio,
                desc: req.body.descuento,
                porcdesc: req.body.porcdesc
            }, function (err, result) {
                if (!err) {
                    res.send({ icono: 'check_circle_outline', mensaje: 'Guardado con éxito!', color: 'teal-14' }).status(200)
                }
                else {
                    res.send({ icono: 'error', mensaje: 'No se pudo guardar!', color: 'red-4' })
                }
            })
        }
        else {
            unaVenta.updateOne({ _id: req.body.id }, {
                nom: req.body.nombre,
                dir: req.body.direccion,
                mes: req.body.mes.label,
                sem: req.body.semana.label,
                ddesp: req.body.diaDespacho,
                rep: req.body.repartidor,
                prods: req.body.productos,
                tot: req.body.total,
                apenv: req.body.apEnvio,
                desc: req.body.descuento,
                porcdesc: req.body.porcdesc
            }, function (err, result) {
                if (!err) {
                    res.send({ icono: 'check_circle_outline', mensaje: 'Editado con éxito!', color: 'teal-14' }).status(200)
                }
                else {
                    res.send({ icono: 'error', mensaje: 'No se pudo editar!', color: 'red-4' })
                }
            })
        } 
    },
    listaVentas: function (req, res) {
        if (req.validacion.data.admin === 1) {
            unaVenta.find( function (err, result) {
                if (err) {
                    res.send({ icono: 'error', mensaje: "El servidor no responde!", color: 'red-4' })
                    return
                }
                if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ icono: 'error', mensaje: "Ningúna venta agregada aún!", color: 'yellow-14' });
                }
            })         
        }
        else {  
            unaVenta.find({ 'usu': req.validacion.data.usuario }, function (err, result) {
                if (err) {
                    res.send({ icono: 'error', mensaje: "El servidor no responde!", color: 'red-4' })
                    return
                }
                if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ icono: 'error', mensaje: "Ningúna venta agregada aún!", color: 'yellow-14' });
                }
            })
        }
    },
    borrarVenta: function (req, res) {
        unaVenta.deleteOne({ _id: req.body.id }, function (err, result) {
            if (!err) {
                res.send({ icono: 'check_circle_outline', mensaje: `Eliminado con éxito!`, color: 'teal-14' }).status(200)
            }
            else {
                res.send({ icono: 'error', mensaje: 'No se pudo eliminar!', color: 'red-4' })
            }
        })
    },
    cambioStatus: function (req, res) {
        unaVenta.updateOne({ _id: req.body._id }, { 'stat': req.body.stat }, function (err, reslt) {
            if (!err) {
                res.send({ icono: 'check_circle_outline', mensaje: 'Guardado con éxito!', color: 'teal-14' })
            }
            else {
                console.log(err)
                res.send({ icono: 'error', mensaje: 'No se pudo guardar!', color: 'red-4' })
            }
        })
    }
}
module.exports = ventas;