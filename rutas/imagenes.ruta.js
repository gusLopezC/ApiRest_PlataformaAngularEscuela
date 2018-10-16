"use strict"
// Cargamos la dependencia de Express
var express = require("express");

//Cargamos el módulo del controlador
var ControladorImagenes = require("../controladores/imagenes.controlador.js");

// Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra API REST.
var api = express.Router();



//Creamos la ruta con el método GET, para pasar el método que va a tener que cargar la página cuando hagamos la petición HTTP de esa ruta
api.get("/probandoImagenes", ControladorImagenes.pruebaImagenes);

api.get("/img/:tipo/:img", ControladorImagenes.mostrarImagenes);


//Exportamos el módulo api
module.exports = api;