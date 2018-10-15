"use strict"

var express = require("express");
var bodyParser = require("body-parser");

// La variable app es el objeto de express
// Esto va a ser el motor de la aplicación del backend porque va a recibir las peticiones http, vamos a poder crear controladores, vamos a poder crear rutas, vamos a poder crear todas las cosas fundamentales dentro de un framework de desarrollo a nivel de backend.
var app = express();

// Esto lo que hace es convertir a objetos json los datos que nos llegan por las peticiones http y poder trabajar con ellos dentro del proyecto.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*=============================================
CARGAR RUTAS
=============================================*/
var rutaUsuarios = require("./rutas/usuarios.ruta.js");
var rutaGrupos = require("./rutas/grupos.ruta.js");
var rutaExamenes = require("./rutas/examenes.ruta.js");
var rutaBusquedas = require("./rutas/busqueda.ruta.js");

/*=============================================
CABECERAS HTTP
=============================================*/

// Configuramos las cabeceras HTTP para permitir el acceso de aplicaciones externas a los datos JSON 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Allow", "GET, POST, PUT, DELETE");
  next();
});

/*=============================================
RUTAS BASE
=============================================*/
//El método get() es una referencia de Express para poder habilitar la aplicación en el puerto establecido
//se ponen dos parámetros, el primero la ruta de la aplicación, el segundo una función con dos parámetros internos, un primer parámetro que es la solicitud "req", es decir lo que va a recibir de la petición y luego un segundo parámetro con la respuesta "res" que es lo que va a devolver
// app.get("/pruebas", function(req,res){

	//Enviamos el estado de la respuesta, existen varios estados, los más comunes:
	// 200 OK
	// 404 Petición no encontrada
	// 500 Error interno del servidor

	// res.status(200).send({message: "Bienvenido"})

// })

app.use("/api", rutaUsuarios);
app.use("/api", rutaGrupos);
app.use("/api", rutaExamenes);
app.use("/api", rutaBusquedas);

// la acción module.exports es de Express.js para que el módulo pueda se usado en otros archivos
module.exports = app;