const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const puerto = process.env.PORT || 3000;
app.use(cors());

const rutas = require('./router/router');
app.use(rutas);

mongoose.connect(`mongodb+srv://mendezfreitez:21057883@cluster0.hhhho.mongodb.net/MrTuna?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
    if (err) { console.log(`Ocurrio un error al intentar conectar con la BD.`); }
    else { console.log(`Conectado a mongoDB.`); }
});

app.get('/', (req, res) => {
    res.send('<h3 style="font-size:50px; font-family: Arial; text-align:center; padding-top:100px; color:#00897b;">Hola @mendezfreitez!!!</h3>')
    // res.send('<h3 style="font-size:50px; font-family: Arial; text-align:center; padding-top:100px; color:#00897b;">Hola Daniel Méndez!!!</h3>')
});

app.listen(puerto, function () {
    console.log(`Escuchando el puerto ${puerto}`)
});

// module.exports = app;