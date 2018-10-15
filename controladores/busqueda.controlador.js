"use strict"

//Método de prueba
function pruebaBusqueda(req, res) {

	res.status(200).send({ mensaje: "Peticion realizada correctamente a busqueda" })

}

module.exports = {
	pruebaBusqueda,
	
}