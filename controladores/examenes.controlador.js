"use strict"

//Método de prueba
function pruebaExamen(req, res) {

	res.status(200).send({ mensaje: "Probando el controlador de Examen" })

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
function crearExamen(req, res) {

	//Creamos una variable que traiga el objeto del modelo Examens
	var examen = new Examen();

	// Recogemos los parámetros que llegan por la petición post
	var parametros = req.body;
	console.log(parametros);
	examen.nombre = parametros.nombre;
	examen.usuario = parametros.usuario;
	examen.grupo = parametros.grupo;
	examen.licencia = parametros.licencia;

	examen.save((error, examenGuardado) => {

		if (error) {
			console.log(error);
			res.status(500).send({ mensaje: "Error al guardar el Examen" })

		} else {

			if (!examenGuardado) {

				res.status(404).send({ mensaje: "No se ha podido guardar el Examen" })

			} else {

				res.status(200).send({ examenGuardado })

			}
		}

	})



	//}

}

/*=============================================
MOSTRAR Examen
=============================================*/

function mostrarExamen(req, res) {


	var desde = req.query.desde || 0;
	desde = Number(desde);


	Examen.find({})
		.populate('usuario', 'name email')
		.populate('grupo', 'nombre')
		.exec(
			(error, mostrandoExamen) => {

				if (error) {
					console.log(error);
					res.status(500).send({ error })

				} else {
					Examen.countDocuments((error, conteo) => {
						res.status(200).send({ mostrandoExamen, total: conteo });
					})
				}

			})


}

/*=============================================
OBTENER EXAMEN
=============================================*/
function BuscarExamen(req, res) {
	var id = req.params.id;

	Examen.findById(id)
		.populate('usuario', 'name email')
		.populate('grupo', 'nombre')
		.exec((err, examen) => {
			if (err) {
				res.status(500).send({
					ok: false,
					mensaje: 'Error al buscar examen',
					errors: err
				});
			}
			if (!examen) {
				res.status(400).send({
					mensaje: 'El examen con el id ' + id + 'no existe',
					errors: { message: 'No existe un examen' }
				});
			}
			res.status(200).send({ examen: examen });

		});
}
/*=============================================
ACTUALIZAR EXAMEN
=============================================*/
function actualizarExamen(req, res) {

	var examen = Examen();

	var id = req.params.id;
	var parametros = req.body;

	examen.findById(id, (err, examen) => {


		if (err) {
			return res.status(500).send({
				mensaje: 'Error al buscar examen',
				errors: err
			});
		}

		if (!examen) {
			return res.status(400).send({
				ok: false,
				mensaje: 'El examen con el id ' + id + ' no existe',
				errors: { message: 'No existe un examen con ese ID' }
			});
		}


		examen.nombre = parametros.nombre;
		examen.usuario = parametros.usuario;
		examen.hospital = parametros.hospital;
		examen.licencia = parametros.licencia;

		examen.save((err, examenGuardado) => {

			if (err) {
				return res.status(400).send({ mensaje: 'Error al actualizar medico', errors: err });
			}

			res.status(200).send({ examenGuardado });

		});

	});

}

/*=============================================
BORRAR EXAMEN
=============================================*/
function borrarExamen(req, res) {

	var id = req.params.id;

	Examen.findOne({ _id: id }, (error, capturarExamen) => {

		if (error) {

			res.status(500).send({ mensaje: "Error al capturar el Examen" })

		} else {

			if (!capturarExamen) {

				res.status(404).send({ mensaje: "No se ha podido capturar el Examen" })

			}
			// xelse{

			// 	var antiguaImagen = capturarExamen.imagen;	
			// 	var rutaImagen = "./ficheros/examen/"+antiguaImagen;
			// 	fs.unlink(rutaImagen);
			// }
		}

	})

	setTimeout(function () {

		Examen.findByIdAndRemove(id, (error, borrarExamen) => {

			if (error) {

				res.status(500).send({ mensaje: "Error al borrar el Examen" })

			} else {

				if (!borrarExamen) {

					res.status(404).send({ mensaje: "No se ha podido borrar el Examen" })

				} else {

					res.status(200).send({ borrarExamen })
				}

			}

		})

	}, 1000)

}


//Exportamos los métodos del módulo
module.exports = {
	pruebaExamen,
	crearExamen,
	mostrarExamen,
	actualizarExamen,
	borrarExamen,
	BuscarExamen
}

