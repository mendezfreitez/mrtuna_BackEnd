const jwt = require('jsonwebtoken');
function validarToken(req, res, next) {
    const token = req.headers['x-access-token']

    if (!token) { 
        console.log('No existe un token!')
        res.send({ icono: 'error', mensaje: 'No existe un token!', color: 'red-4' })
    }
    validacion = jwt.verify(token, '21057883daniel')
    req.validacion = validacion
    next()
}

module.exports = validarToken;