"use strict"

var Grupos = require("../modelos/grupos.modelo.js");
var Examen = require("../modelos/examenes.modelo.js");
var Usuarios = require("../modelos/usuarios.modelo.js");
//Método de prueba
function pruebaBusqueda(req, res) {

	res.status(200).send({ mensaje: "Peticion realizada correctamente a busqueda" })

}
/**	============================================
 * 	BUSQUEDA ESPECIFICA POR TABLA
 * ============================================
 */
function BusquedaEspecifica(req, res, next) {

	var busqueda = req.params.busqueda;
	var tabla = req.params.tabla;
	var regex = new RegExp(busqueda, 'i');

	var promesa;

	switch (tabla) {
		case 'usuarios':
			promesa = busquedaUsuarios(busqueda, regex);
			break;
		case 'grupos':
			promesa = busquedaGrupos(busqueda, regex);
			break;
		case 'examenes':
			promesa = busquedaExamenes(busqueda, regex);
			break;
		default:
			res.status(400).send({ mensaje: 'No existe la tabla' });
	}
	promesa.then(data => {
		res.status(200).send({
			[tabla]:data
		});
	});
}


/**	============================================
 * 	BUSQUEDA GENERAL EN LAS 3 TABLAS
 * ============================================
 */

function BusquedaTodo(req, res, next) {

	var busqueda = req.params.busqueda;
	var regex = new RegExp(busqueda, 'i');

	Promise.all([
		busquedaGrupos(busqueda, regex),
		busquedaGrupos(busqueda, regex),
		busquedaUsuarios(busqueda, regex)])
		.then(respuesta => {
			res.status(200).send({
				grupos: respuesta[0],
				examenes: respuesta[1],
				usuarios: respuesta[2],
			});
		})


}//End funcion BusquedaTodo

function busquedaGrupos(busqueda, regex) {

	return new Promise((resolve, reject) => {
		Grupos.find({ nombre: regex })
			.populate('usuario', ' nombre email')
			.exec((err, BusquedaGrupos) => {

				if (err) {
					reject('Error al cargar Hospital', err);
				} else {
					resolve(BusquedaGrupos);
				}
			});
	});
}

function busquedaExamenes(busqueda, regex) {

	return new Promise((resolve, reject) => {
		Examen.find({ nombre: regex })
			.populate('usuario', ' nombre email')
			.populate('grupo', ' nombre')
			.exec((err, BusquedaExamen) => {

				if (err) {
					reject('Error al cargar Hospital', err);
				} else {
					resolve(BusquedaExamen);
				}
			})

	});
}

function busquedaUsuarios(busqueda, regex) {

	return new Promise((resolve, reject) => {
		Usuarios.find({}, 'usuario nombre email')
			.or([{ 'nombre': regex }, { 'email': regex }])
			.exec((err, usuarios) => {

				if (err) {
					reject('Error al cargar Usuario', err);
				} else {
					resolve(usuarios);
				}
			});

	});
}

module.exports = {
	pruebaBusqueda,
	BusquedaTodo,
	BusquedaEspecifica

}