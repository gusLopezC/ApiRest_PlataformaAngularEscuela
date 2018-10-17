"use strict"
// Cargamos la dependencia de Express
var express = require("express");

//Cargamos el módulo del controlador
var ControladorUsuarios = require("../controladores/usuarios.controlador.js");

// Cargamos el Router de Express.js y con esto podemos crear rutas para nuestra API REST.
var api = express.Router();

var md_aut = require("../token/aut.js");

/*
 *Para sacar el token del post hay que pasar como parametro token = true para que lo guarde ahi 
 * para mandar el token en get en header seleccionamos Authorization y pasamos el token 
 */

//Creamos la ruta con el método GET, para pasar el método que va a tener que cargar la página cuando hagamos la petición HTTP de esa ruta
api.get("/pruebaUsuarios", md_aut.autenticacion, ControladorUsuarios.pruebaUsuarios);

api.get("/Usuarios", ControladorUsuarios.mostrarUsuario);

//Creamos la ruta para crear usuarios y utilizamos el método POST
api.post("/Usuarios", ControladorUsuarios.crearUsuarios);

//Creamos la ruta para el ingreso de usuario y utilizamos el método POST
api.post("/Login", ControladorUsuarios.ingresoUsuario);

//================== LOGIN POR GOOGLE
api.post("/LoginGoogle",  ControladorUsuarios.ingresoUsuarioGoogle);

//Creamos la ruta para la actualización del usuario y utilizamos el método PUT
api.put("/Usuarios/:id", md_aut.autenticacion, ControladorUsuarios.actualizarUsuario);

//Creamos la ruta para borrar usuario y utilizamos el método DELETE
api.delete("/Usuarios/:id", md_aut.autenticacion, ControladorUsuarios.borrarUsuario)


//EXportamos el módulo api
module.exports = api;