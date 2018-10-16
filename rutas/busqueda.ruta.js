"use strict"
// Cargamos la dependencia de Express
var express = require("express");

//Cargamos el módulo del controlador
var ControladorBusqueda = require("../controladores/busqueda.controlador.js");

// Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra API REST.
var api = express.Router();

//Creamos la ruta con el método GET, para pasar el método que va a tener que cargar la página cuando hagamos la petición HTTP de esa ruta
api.get("/probandoBusqueda", ControladorBusqueda.pruebaBusqueda);

api.get("/todo/:busqueda", ControladorBusqueda.BusquedaTodo);

api.get("/coleccion/:tabla/:busqueda", ControladorBusqueda.BusquedaEspecifica);


//Exportamos el módulo api
module.exports = api;