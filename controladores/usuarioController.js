const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const usuarioEsquema = new mongoose.Schema({
    usuario: String,
    contrasenia: String,
    correo: String,
    admin: Number,
    per: Number
});
const unUsuario = mongoose.model('usuarios', usuarioEsquema);
const usuario = {
    registro:  function (req, res) {
        if (req.body.usuario === "") {
            res.send({ icono: 'error', mensaje: "Debe ingresar un usuario!", color: 'yellow-14' }).status(401)
            return
        }
        else if (req.body.contrasenia.length < 6) {
            res.send({ icono: 'error', mensaje: "La contraseña debe tener al menos 6 caracteres!", color: 'yellow-14' }).status(401)
            return
        }
        else if (req.body.contrasenia === "") {
            res.send({ icono: 'error', mensaje: "Debe ingresar una contraseña!", color: 'yellow-14' }).status(401)
            return
        }
        else if (req.body.repetirContrasenia === "") {
            res.send({ icono: 'error', mensaje: "Debe repetir su contraseña!", color: 'yellow-14' }).status(401)
            return
        }
        else if (req.body.contrasenia != req.body.repetirContrasenia) {
            res.send({ icono: 'error', mensaje: "Las contraseñas no coinciden!", color: 'yellow-14' }).status(401)
            return
        }
    
        unUsuario.find({ 'usuario': req.body.usuario }, function (err, documentos) {
            if (documentos.length === 0) {
                bcrypt.hash(req.body.contrasenia, SaltRounds)
                    .then(function (hashedPassword) {
                        unUsuario.create({ 'usuario': req.body.usuario, 'contrasenia': hashedPassword, 'correo': req.body.correo, 'admin': 0, 'per': 0 }, function (err) {
                            if (!err) {
                                res.send({ icono: 'check_circle_outline', mensaje: 'Usuario guardado con éxito!', color: 'teal-14' }).status(200)
                            }
                            else {
                                res.send({ icono: 'error', mensaje: 'No fue posible crear el usuario!', color: 'red-5' })
                            }
                        })
                    })
            }
            else {
                res.send({ icono: 'error', mensaje: `El usuario <b>"${req.body.usuario}"</b> ya existe!`, color: 'yellow-14' })
            }
        })
    },
    login: function (req, res) {
        if (req.body.usuario === "") {
            res.send({ icono: 'error', mensaje: "Debe ingresar un usuario", color: 'yellow-14' })
            return
        }
        else if (req.body.contrasenia === "") {
            res.send({ icono: 'error', mensaje: "Debe ingresar una contraseña", color: 'yellow-14' })
            return
        }
        unUsuario.find({ 'usuario': req.body.usuario }, function (err, result) {
            console.log(result[0])
            if (result.length > 0) {
                if (result[0].per === 0) {
                    res.send({ icono: 'error', mensaje: 'No tiene permisos de acceso!', color: 'yellow-14' })
                    return
                }
                else {
                    bcrypt.compare(req.body.contrasenia, result[0].contrasenia, function (err, resultt) {
                        if (!err) {
                            if (resultt === true) {
                                const token = jwt.sign({ data: result[0] }, '21057883daniel')
                                res.send({ icono: 'check_circle_outline', mensaje: 'Sesión Iniciada', color: 'teal-14', dataUsuario: result, token }).status(200)
                                console.log(result)
                            }
                            else {
                                res.send({ icono: 'clear', mensaje: "Clave incorrecta!", color: 'red-6' })
                            }
                        }
                        else {
                            res.send({ icono: 'clear', mensaje: 'Hay un inconveniente :(', color: 'red-6' })
                        }
                    })                
                }
            }
            else {
                res.send({ icono: 'error', mensaje: `Usuario <b>"${req.body.usuario}"</b> no registrado`, color: 'yellow-14' })
            }
        });
    },
    permisos: function (req, res) {
        unUsuario.find({ 'admin': 0 }, function (err, result) {
            if (err) {
                res.send({ icono: 'error', mensaje: "El servidor no responde!", color: 'red-4' })
            }
            if (result.length > 0) {
                res.send(result)
            }
            else {
                res.send({ icono: 'error', mensaje: "Ningún usuario sin accesos de administrador!", color: 'yellow-14' })
            }
        })
    },
    setPermiso: function (req, res) {
        unUsuario.updateOne({ _id: req.body.id }, { per: req.body.per }, function (err, result) {
            if (!err) {
                res.send({ icono: 'check_circle_outline', mensaje: 'Guardado con éxito!', color: 'teal-14' })
            }
        })
    }
}
module.exports = usuario;