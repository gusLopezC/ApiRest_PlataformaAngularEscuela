"use strict"
// Cargamos la dependencia de Express
var express = require("express");

//Cargamos el módulo del controlador
var ControladorGrupos = require("../controladores/grupos.controlador.js");

// Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra API REST.
var api = express.Router();

//Cargamos la dependencia para subir ficheros
var multipart = require("connect-multiparty");

var fichero = multipart({
	// Ruta donde se suben las imágenes
	uploadDir: "./ficheros/grupos"

})

var md_aut = require("../token/aut.js");

//Creamos la ruta con el método GET, para pasar el método que va a tener que cargar la página cuando hagamos la petición HTTP de esa ruta
api.get("/probando-controlador-Grupos", ControladorGrupos.pruebaGrupos);
//Creamos la ruta para subir un Grupos utilizando el Token de aut, y la ruta donde se van a subir las imágenes
api.post("/Grupos",  ControladorGrupos.crearGrupos);

api.get("/Grupos",  ControladorGrupos.mostrarGrupos);

api.get("/BuscarGrupo/:id",  ControladorGrupos.BuscarGrupo);

api.put("/Grupos/:id", md_aut.autenticacion, ControladorGrupos.actualizarGrupos);

api.delete("/Grupos/:id", md_aut.autenticacion, ControladorGrupos.borrarGrupos);

api.get("/tomar-imagen-Grupos/:imagen", ControladorGrupos.tomarImagenGrupos);


//EXportamos el módulo api
module.exports = api;