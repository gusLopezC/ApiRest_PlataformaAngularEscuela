"use strict"

const path = require('path');
const fs = require('fs');

//Método de prueba
function pruebaImagenes(req, res) {

    res.status(200).send({ mensaje: "Peticion realizada correctamente a busqueda" })

}

function mostrarImagenes(req, res, next) {

    var tipo = req.params.tipo;
    var tipo = req.params.img;

    var pathImagen = path.resolve(__dirname, `../ficheros/${tipo}/${img}`);
    if (fs.existsSync(pathImagen)) {
            res.sendFile(pathImagen);
    } else{
        var pathNoImagen= path.resolve(__dirname,'../assets/no-img.jpg')
        res.sendFile(pathNoImagen)
    }


 //   res.status(200).send({ mensaje: "Peticion realizada correctamente a busqueda" })

}

module.exports = {
    pruebaImagenes,
    mostrarImagenes

}