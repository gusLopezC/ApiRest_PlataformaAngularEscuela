"use strict"

var Grupos = require("../modelos/grupos.modelo.js");
var Examen = require("../modelos/examenes.modelo.js");
var Usuarios = require("../modelos/usuarios.modelo.js");

var fs = require('fs');

//Método de prueba
function pruebaUpload(req, res) {

	res.status(200).send({ mensaje: "Peticion realizada correctamente a upload" })

}

function SubirUpload(req, res, next) {
	var tipo = req.params.tipo;
	var id = req.params.id;


	console.log(req.params);

	//tipos de coleccion

	var tiposValidos = ['usuarios', 'grupos', 'examen'];

	if (tiposValidos.indexOf(tipo) < 0) {
		return res.status(400).send({ mensaje: 'No es una coleccion valida solo se permite = ' + tiposValidos.join(',') });

	}

	console.log(req.files);

	if (!req.files) {
		return res.status(400).send({ mensaje: 'No  se encontra el archivo cargado' });
	}

	//Obtener nombre del archivo
	var archivo = req.files.imagen;
	var nombreCortado = archivo.name.split('.');
	var extensionArchivo = nombreCortado[nombreCortado.length - 1];

	//Solo estas extensiones de imagenes son validad
	var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

	if (extensionesValidas.indexOf(extensionArchivo) < 0) {
		return res.status(400).send('No es una extension valida de archivo' + extensionesValidas.join(','));
	}

	//Nombre de archivo personalizado
	var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

	//Mover el archivo del temporal a un Path especifico
	var path = `./ficheros/${tipo}/${nombreArchivo}`;


	/**
	 * Moveremos la imagen ya con el nombre generado aleatorio 
	 */
	archivo.mv(path, err => {
		if (err) {
			return res.status(500).send(err);
		}

		subirPorTipo(tipo, id, nombreArchivo, res);
		//res.status(200).send({ mensaje: 'Archivo subido!', path });
	});


}

function subirPorTipo(tipo, id, nombreArchivo, res) {

	if (tipo === 'usuarios') {

		Usuarios.findById(id, (err, usuario) => {

			if (!usuario) {
				return res.status(400).send({ mensaje: 'No existe el usuario', err });

			}

			var pathViejo = './ficheros/usuarios/' + usuario.imagen;

			/**
			 * Si encuentra un archivo con el path viejo las borra 
			 */
			// if (fs.existsSync(pathViejo)) {
			// 	fs.unlink(pathViejo);
			// }
			usuario.imagen = nombreArchivo;
			usuario.save((err, usuarioActualizado) => {
				if (err) {
					return res.status(500).send(err);
				}
				return res.status(200).send({ mensaje: 'Imagen de usuario actualizada', usuarioActualizado });
			});

		})
	}
	if (tipo === 'grupos') {
		Grupos.findById(id, (err, grupo) => {

			if (!grupo) {
				return res.status(400).send({ mensaje: 'No existe el grupo', err });

			}

			var pathViejo = './ficheros/grupos/' + grupo.imagen;

			/**
			 * Si encuentra un archivo con el path viejo las borra 
			 */
			// if (fs.existsSync(pathViejo)) {
			// 	fs.unlink(pathViejo);
			// }
			grupo.imagen = nombreArchivo;

			grupo.save((err, grupoActualizado) => {
				if (err) {
					return res.status(500).send(err);
				}

				return res.status(200).send({ mensaje: 'Imagen de grupo actualizada', grupoActualizado });
			});

		})
	}

	if (tipo === 'examenes') {

		Examen.findById(id, (err, examen) => {

			if (!examen) {
				return res.status(400).send({ mensaje: 'No existe el examen', err });

			}

			var pathViejo = './ficheros/examen/' + examen.imagen;

			/**
			 * Si encuentra un archivo con el path viejo las borra 
			 */
			if (fs.existsSync(pathViejo)) {
				fs.unlink(pathViejo);
			}
			examen.imagen = nombreArchivo;

			examen.save((err, examenActualizado) => {
				if (err) {
					return res.status(500).send(err);
				}
				return res.status(200).send({ mensaje: 'Imagen de examen actualizada', examenActualizado });
			});

		})
	}


}


module.exports = {
	pruebaUpload,
	SubirUpload,
	subirPorTipo
}