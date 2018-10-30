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
		grupos.save((err, grupoGuardado) => {
			
			if (err) {
				console.log(err);
				res.status(500).send({ mensaje: "Error al guardar el Grupo" })

			} else {

				if (!grupoGuardado) {

					res.status(404).send({ mensaje: "No se ha podido guardar el Grupo" })

				} else {

					res.status(200).send({ grupoGuardado })

				}
			}

		})

	

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
			Grupos.countDocuments((error, conteo) => {
				res.status(200).send({ mostrandoGrupos, total: conteo });

			})
		}

	}).populate('Usuarios', 'nombre email');

}
/*=============================================
MOSTRAR GRUPO ESPECIFICO
=============================================*/
function BuscarGrupo(req, res) {
	var id = req.params.id;

	Grupos.findById(id)
		.populate('Usuarios')
		.exec((err, grupos) => {
			if (err) {
				res.status(500).send({
					ok: false,
					mensaje: 'Error al buscar grupos',
					errors: err
				});
			}
			if (!grupos) {
				res.status(400).send({
					mensaje: 'El grupos con el id ' + id + 'no existe',
					errors: { message: 'No existe un grupos' }
				});
			}
			res.status(200).send({ grupos: grupos });

		});

};

/*=============================================
ACTUALIZAR GRUPO
=============================================*/
function actualizarGrupos(req, res) {
	var grupos = Grupos();
	var id = req.params.id;
	var actualizar = req.body;

	console.log(actualizar)

	Grupos.findByIdAndUpdate(id, actualizar, (error, grupoActualizado) => {

		if (error) {

			res.status(500).send({ mensaje: "Error al actualizar el usuario" })
		}

		else {

			if (!grupoActualizado) {

				res.status(404).send({ mensaje: "No se ha podido actualizar el usuario" })

			} else {

				res.status(200).send({ grupoActualizado })
			}

		}

	})
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
	BuscarGrupo,
	tomarImagenGrupos
}
