"use strict"

//Método de prueba
function pruebaExamen(req, res){

	res.status(200).send({mensaje:"Probando el controlador de Examen"})

}

var Examen = require("../modelos/examenes.modelo.js");

//Para poder borrar el archivo antiguo al actualizar una nueva imagen
var fs = require("fs");
var path = require("path");


/**
 * ATENCION:
 * Hay que mandar grupo  como parametro y  su valor es el id  para crear la relaciones
 * 
 */

/*=============================================
CREAR Examen
=============================================*/
function crearExamen(req, res){

	//Creamos una variable que traiga el objeto del modelo Examens
	var examen = new Examen();

	// Recogemos los parámetros que llegan por la petición post
	var parametros = req.body;

	examen.nombre = parametros.nombre;
	examen.descripcion = parametros.descripcion;
	examen.usuario = parametros.usuario;
	examen.grupo = parametros.grupo;
	// if(req.files){
		
	// 	var imagenRuta = req.files.imagen.path;

	// 	var imagenSplit = imagenRuta.split("\\");

	// 	examen.imagen = imagenSplit[2];

		if(examen.nombre != null && examen.descripcion != null){

			examen.save((error, examenGuardado)=>{

				if(error){

					res.status(500).send({mensaje: "Error al guardar el Examen"})
				
				}else{

					if(!examenGuardado){

						res.status(404).send({mensaje: "No se ha podido guardar el Examen"})
					
					}else{

						res.status(200).send({examenGuardado})

					}
				}

			})

		}

	//}

}

/*=============================================
MOSTRAR Examen
=============================================*/

function mostrarExamen(req, res){

	Examen.find((error, mostrandoExamen)=>{

		if(error){

			res.status(500).send({mensaje: "Error en la petición"})

		}else{

			res.status(200).send({mostrandoExamen});
		}

	}).sort("_id");

}

/*=============================================
ACTUALIZAR EXAMEN
=============================================*/
function actualizarExamen(req,res){

	var examen = Examen();

	var id = req.params.id;
	var parametros = req.body;

	examen.nombre = parametros.nombre;
	examen.descripcion = parametros.descripcion;
	examen.usuario = req.params._id;
	examen.grupo = body.grupo;
	var cambioImagen = false;

	if(parametros.actualizarImagen == "0"){

		examen.imagen = parametros.rutaImagenActual;
		cambioImagen = true;
		
	}else{

		if(req.files){
		
			var imagenRuta = req.files.imagen.path;
			var imagenSplit = imagenRuta.split("\\");

			examen.imagen = imagenSplit[2];

			var antiguaImagen = parametros.rutaImagenActual;
			var rutaImagen = "./ficheros/examen/"+antiguaImagen;
		
			fs.unlink(rutaImagen);
		}

		cambioImagen = true;

	}

	if(cambioImagen){

		if(examen.nombre != null && examen.descripcion != null && examen.imagen != null){

			var actualizar = {
					"nombre": examen.nombre,
					"descripcion": examen.descripcion,
					"imagen": examen.imagen
			}

			Examen.findByIdAndUpdate(id, actualizar, (error, examenActualizado)=>{

				if(error){

					res.status(500).send({mensaje: "Error al actualizar el Examen"})
				
				}else{

					if(!examenActualizado){

						res.status(404).send({mensaje: "No se ha podido actualizar el Examen"})	

					}else{

						res.status(200).send({examenActualizado});

					}

				}

			})

		}

	}

}

/*=============================================
BORRAR EXAMEN
=============================================*/
function borrarExamen(req, res){

	var id = req.params.id;

	Examen.findOne({_id: id}, (error, capturarExamen)=>{

		if(error){

			res.status(500).send({mensaje: "Error al capturar el Examen"})
		
		}else{

			if(!capturarExamen){

				res.status(404).send({mensaje: "No se ha podido capturar el Examen"})		
			
			}
			// xelse{

			// 	var antiguaImagen = capturarExamen.imagen;	
			// 	var rutaImagen = "./ficheros/examen/"+antiguaImagen;
			// 	fs.unlink(rutaImagen);
			// }
		}

	})

	setTimeout(function(){

		Examen.findByIdAndRemove(id, (error, borrarExamen)=>{

			if(error){

				res.status(500).send({mensaje: "Error al borrar el Examen"})
			
			}else{

				if(!borrarExamen){

					res.status(404).send({mensaje: "No se ha podido borrar el Examen"})		
				
				}else{

					res.status(200).send({borrarExamen})		
				}

			}
		
		})

	}, 1000)

}

/*=============================================
TOMAR IMAGEN EXAMEN
=============================================*/

function tomarImagenExamen(req, res){

	var imagen = req.params.imagen;
	var rutaImagen = "./ficheros/examen/"+imagen;

	fs.exists(rutaImagen, function(exists){

		if(exists){

			res.sendFile(path.resolve(rutaImagen))
		
		}else{

			res.status(404).send({mensaje: "La imagen no existe"})	

		}

	})

}

//Exportamos los métodos del módulo
module.exports = {
	pruebaExamen,
	crearExamen,
	mostrarExamen,
	actualizarExamen,
	borrarExamen,
	tomarImagenExamen}
