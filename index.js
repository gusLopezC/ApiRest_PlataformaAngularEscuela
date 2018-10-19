"use strict"
// Utilizar orden "use strict" para poder meter instrucciones de los nuevos estándares de javascript

/*=============================================
LIBRERÍA MONGODB
=============================================*/
// Utilizamos mongoose como librería para intermediar con la base de datos de mongoDB
// Cargamos la librería utilizando la función require()
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
/*=============================================
MODULO DE EXPRESS
=============================================*/
var app = require("./app");
//Esto es para establecer la variable de entorno PORT (puerto HTTP)
var port = process.env.PORT || 1234;

/*=============================================
CONEXIÓN A BASE DE DATOS       useNewUrlParser: true, autoIndex: false 
=============================================*/
mongoose.connection.openUri("mongodb://localhost:27017/Plataforma",{useNewUrlParser: true, autoIndex: false },(error,respuesta)=>{

	if(error){

		throw error;
	
	}else{

		console.log("La conexión a la base de datos está correcta");

		//El método listen() es una referencia de Express.js para traer dos parámetros, el puerto y la acción con el puerto.
		app.listen(port, function(){

			console.log("Servidor del ApiRest en http://localhost:"+port)
		
		})
	}

})



