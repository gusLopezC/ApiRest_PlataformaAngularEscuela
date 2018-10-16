"use strict"
// Cargamos la dependencia de Express
var express = require("express");
const fileUpload = require('express-fileupload');



// Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra API REST.
var api = express.Router();
 api = express();

// default options
api.use(fileUpload());

//Cargamos el módulo del controlador
var ControladorUpload = require("../controladores/upload.controlador.js");



//Creamos la ruta con el método GET, para pasar el método que va a tener que cargar la página cuando hagamos la petición HTTP de esa ruta
api.get("/probandoUpload", ControladorUpload.pruebaUpload);

api.put("/upload/:tipo/:id", ControladorUpload.SubirUpload);
    

//Exportamos el módulo api
module.exports = api;