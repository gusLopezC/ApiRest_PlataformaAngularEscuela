"use strict"

var Grupos = require("../modelos/grupos.modelo.js");
var Examen = require("../modelos/examenes.modelo.js");
//Método de prueba
function pruebaBusqueda(req, res) {

	res.status(200).send({ mensaje: "Peticion realizada correctamente a busqueda" })

}

function BusquedaTodo(req, res, next) {



	var busqueda = req.params.busqueda;
	var regex = new RegExp(busqueda, 'i');


	busquedaGrupos(busqueda, regex).then(BusquedaGrupos => {
		res.status(200).send({ grupos: BusquedaGrupos });
	});


}//End funcion BusquedaTodo

function busquedaGrupos(busqueda, regex) {

	return new Promise((resolve, reject) => {
		Grupos.find({ nombre: regex }, (err, BusquedaGrupos) => {

			if (err) {
					reject('Error al cargar Hospital',err);
			} else {
				resolve(BusquedaGrupos);
			}
		})

	});
}

module.exports = {
	pruebaBusqueda,
	BusquedaTodo

}