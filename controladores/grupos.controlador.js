"use strict"

//Método de prueba
function pruebaGrupos(req, res) {

	res.status(200).send({ mensaje: "Probando el controlador de Grupos" })

}

var Grupos = require("../modelos/grupos.modelo.js");

//Para poder borrar el archivo antiguo al actualizar una nueva imagen
var fs = require("fs");
var path = require("path");

/*=============================================
CREAR Grupos
=============================================*/
function crearGrupos(req, res) {

	//Creamos una variable que traiga el objeto del modelo Gruposs
	var grupos = new Grupos();

	// Recogemos los parámetros que llegan por la petición post
	var parametros = req.body;

	grupos.nombre = parametros.nombre;
	grupos.descripcion = parametros.descripcion;
	grupos.usuario = parametros.usuario;
	// if(req.files){

	// 	var imagenRuta = req.files.imagen.path;

	// 	var imagenSplit = imagenRuta.split("\\");

	// 	grupos.imagen = imagenSplit[2];

	if (grupos.nombre != null && grupos.descripcion != null) {

		grupos.save((error, grupoGuardado) => {

			if (error) {

				res.status(500).send({ mensaje: "Error al guardar el Grupo" })

			} else {

				if (!grupoGuardado) {

					res.status(404).send({ mensaje: "No se ha podido guardar el Grupo" })

				} else {

					res.status(200).send({ grupoGuardado })

				}
			}

		})

	}

	//}

}

/*=============================================
MOSTRAR Grupos
=============================================*/

function mostrarGrupos(req, res) {

	var desde = req.query.desde || 0;
	desde = Number(desde);

	Grupos.find((error, mostrandoGrupos) => {

		if (error) {
			console.log(error);
			res.status(500).send({ mensaje: "Error en la petición" })

		} else {
			Grupos.count((error, conteo) => {
				res.status(200).send({mostrandoGrupos,total : conteo});

			})
			}

	}).populate('Usuarios', 'nombre email');

}

/*=============================================
ACTUALIZAR GRUPO
=============================================*/
function actualizarGrupos(req, res) {

	var grupos = Grupos();

	var id = req.params.id;
	var parametros = req.body;

	grupos.nombre = parametros.nombre;
	grupos.descripcion = parametros.descripcion;
	grupos.usuario = parametros.usuario;
	var cambioImagen = false;

	if (parametros.actualizarImagen == "0") {

		grupos.imagen = parametros.rutaImagenActual;
		cambioImagen = true;

	} else {

		if (req.files) {

			var imagenRuta = req.files.imagen.path;
			var imagenSplit = imagenRuta.split("\\");

			grupos.imagen = imagenSplit[2];

			var antiguaImagen = parametros.rutaImagenActual;
			var rutaImagen = "./ficheros/grupos/" + antiguaImagen;

			fs.unlink(rutaImagen);
		}

		cambioImagen = true;

	}

	if (cambioImagen) {

		if (grupos.nombre != null && grupos.descripcion != null && grupos.imagen != null) {

			var actualizar = {
				"nombre": grupos.nombre,
				"descripcion": grupos.descripcion,
				"imagen": grupos.imagen
			}

			Grupos.findByIdAndUpdate(id, actualizar, (error, grupoActualizado) => {

				if (error) {

					res.status(500).send({ mensaje: "Error al actualizar el Grupo" })

				} else {

					if (!grupoActualizado) {

						res.status(404).send({ mensaje: "No se ha podido actualizar el Grupo" })

					} else {

						res.status(200).send({ grupoActualizado });

					}

				}

			})

		}

	}

}

/*=============================================
BORRAR Grupo
=============================================*/
function borrarGrupos(req, res) {

	var id = req.params.id;

	Grupos.findOne({ _id: id }, (error, capturarGrupo) => {

		if (error) {

			res.status(500).send({ mensaje: "Error al capturar el Grupo" })

		} else {

			if (!capturarGrupo) {

				res.status(404).send({ mensaje: "No se ha podido capturar el Grupo" })

			}
			// xelse{

			// 	var antiguaImagen = capturarGrupo.imagen;	
			// 	var rutaImagen = "./ficheros/grupos/"+antiguaImagen;
			// 	fs.unlink(rutaImagen);
			// }
		}

	})

	setTimeout(function () {

		Grupos.findByIdAndRemove(id, (error, borrarGrupo) => {

			if (error) {

				res.status(500).send({ mensaje: "Error al borrar el Grupo" })

			} else {

				if (!borrarGrupo) {

					res.status(404).send({ mensaje: "No se ha podido borrar el Grupo" })

				} else {

					res.status(200).send({ borrarGrupo })
				}

			}

		})

	}, 1000)

}

/*=============================================
TOMAR IMAGEN Grupo
=============================================*/

function tomarImagenGrupos(req, res) {

	var imagen = req.params.imagen;
	var rutaImagen = "./ficheros/grupos/" + imagen;

	fs.exists(rutaImagen, function (exists) {

		if (exists) {

			res.sendFile(path.resolve(rutaImagen))

		} else {

			res.status(404).send({ mensaje: "La imagen no existe" })

		}

	})

}

//Exportamos los métodos del módulo
module.exports = {
	pruebaGrupos,
	crearGrupos,
	mostrarGrupos,
	actualizarGrupos,
	borrarGrupos,
	tomarImagenGrupos
}
