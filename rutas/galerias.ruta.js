"use strict"
// Cargamos la dependencia de Express
var express = require("express");

//Cargamos el módulo del controlador
var ControladorGalerias = require("../controladores/galerias.controlador.js");

// Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra API REST.
var api = express.Router();

//Cargamos la dependencia para subir ficheros
var multipart = require("connect-multiparty");

var fichero = multipart({
	// Ruta donde se suben las imágenes
	uploadDir: "./ficheros/galeria"

})

var md_aut = require("../token/aut.js");

//Creamos la ruta con el método GET, para pasar el método que va a tener que cargar la página cuando hagamos la petición HTTP de esa ruta
api.get("/probando-controlador-Galerias", ControladorGalerias.pruebaGalerias);

api.post("/crear-foto", [md_aut.autenticacion, fichero], ControladorGalerias.crearFoto);

api.get("/mostrar-fotos",  ControladorGalerias.mostrarFotos);

api.delete("/borrar-foto/:id", md_aut.autenticacion, ControladorGalerias.borrarFoto);

api.get("/tomar-imagen-galeria/:foto", ControladorGalerias.tomarImagenGaleria);

//Exportamos el módulo api
module.exports = api;