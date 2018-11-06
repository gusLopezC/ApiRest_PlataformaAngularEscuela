"use strict"
// Cargamos la dependencia de Express
var express = require("express");

//Cargamos el módulo del controlador
var ControladorExamenes = require("../controladores/examenes.controlador.js");

// Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra API REST.
var api = express.Router();

//Cargamos la dependencia para subir ficheros
var multipart = require("connect-multiparty");

var fichero = multipart({
	// Ruta donde se suben las imágenes
	uploadDir: "./ficheros/examen"

})

var md_aut = require("../token/aut.js");

//Creamos la ruta con el método GET, para pasar el método que va a tener que cargar la página cuando hagamos la petición HTTP de esa ruta
api.get("/probando-controlador-Examen", ControladorExamenes.pruebaExamen);
//Creamos la ruta para subir un Examen utilizando el Token de aut, y la ruta donde se van a subir las imágenes
api.post("/Examenes", ControladorExamenes.crearExamen);

api.get("/Examenes", ControladorExamenes.mostrarExamen);

api.get("/BuscarExamen/:id", ControladorExamenes.BuscarExamen);

api.put("/Examenes/:id", md_aut.autenticacion, ControladorExamenes.actualizarExamen);

api.delete("/Examenes/:id", md_aut.autenticacion, ControladorExamenes.borrarExamen);


//EXportamos el módulo api
module.exports = api;