var app = require('./app'); // this is your express app
var http = require('http'); // 3. HTTP server

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT; // 2. Using process.env.PORT
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

var mongoose = require("mongoose");

/*=============================================
CONEXIÓN A BASE DE DATOS
=============================================*/
mongoose.connect("mongodb://", (error, respuesta) => {

  if(error){

    throw error;
  
  }else{

    console.log("La conexión a la base de datos está correcta");

    //El método listen() es una referencia de Express.js para traer dos parámetros, el puerto y la acción con el puerto.
    server.listen(port)
  }

})

