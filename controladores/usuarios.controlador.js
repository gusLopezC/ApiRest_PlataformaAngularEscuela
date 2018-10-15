"use strict"

//Método de prueba
function pruebaUsuarios(req, res) {

	res.status(200).send({ mensaje: "Probando el controlador de usuarios" })

}

// Importamos el modelo de usuarios
var Usuarios = require("../modelos/usuarios.modelo.js");

//Importamos la dependencia para encriptar contraseñas
var bcrypt = require("bcrypt-nodejs");

//Importamos el token
var token = require("../token/token.js");

//Metodo para mostrarUsuarios
function mostrarUsuario(req, res) {

	var desde = req.query.desde || 0;
	desde = Number(desde);

	Usuarios.find((error, mostrandousuarios) => {

		if (error) {
			res.status(500).send({ message: "Error al mostrar la Grupo" })
		} else {
			Usuarios.count((error, conteo) => {
				mostrandousuarios.password = ":)";
				res.status(200).send({mostrandousuarios,total : conteo});

			})
		}
	}).sort("nombre")
		.skip(desde)
		.limit(5);
}

//Método para crear Usuarios
function crearUsuarios(req, res) {

	//creamos una variable que traiga el objeto del modelo Usuarios
	var usuarios = new Usuarios();

	//recogemos los parámetros que llegan por la petición POST
	var parametros = req.body;

	usuarios.usuario = parametros.usuario;
	usuarios.name = parametros.name;
	usuarios.email = parametros.email;
	usuarios.imagen = parametros.imagen;
	usuarios.role = parametros.role;
	usuarios.escuela = parametros.escuela;

	if (parametros.password) {

		bcrypt.hash(parametros.password, null, null, function (error, hash) {
			usuarios.password = hash;

			if (usuarios.usuario != null) {

				usuarios.save((error, usuarioGuardado) => {

					if (error) {
						console.log(error);
						res.status(500).send({ error, mensaje: "Error al guardar el usuario" })

					} else {

						res.status(200).send({ usuarioGuardado })
					}

				})

			}

		})

	}

}

//Método para ingreso de usuarios
function ingresoUsuario(req, res) {

	var parametros = req.body;
	var usuario = parametros.usuario;
	var password = parametros.password;

	Usuarios.findOne({ usuario: usuario }, (error, seleccionUsuario) => {

		if (error) {

			res.status(500).send({ mensaje: "Error al ingresar el usuario" })

		} else {

			if (!seleccionUsuario) {

				res.status(404).send({ mensaje: "El usuario no existe" })

			} else {

				// res.status(200).send({seleccionUsuario});

				//Comparamos la contraseña que viene del INPUT con la contraseña de la DB
				bcrypt.compare(password, seleccionUsuario.password, function (error, ok) {

					if (ok) {

						// res.status(200).send({seleccionUsuario});

						// Debemos enviar un parámetro token en verdadero

						if (parametros.token) {

							//Devolvemos un token de JWT
							seleccionUsuario.password = ":)";
							res.status(200).send({ token: token.crearToken(seleccionUsuario), seleccionUsuario })

						}

					} else {

						res.status(404).send({ mensaje: "El usuario no ha podido ingresar" })
					}

				})

			}

		}

	})

}

//Método para actualizar usuario
function actualizarUsuario(req, res) {

	//Llamamos por parámetro el id que necesitamos actualizar
	var id = req.params.id;
	//Tomamos los datos del formulario
	var actualizar = req.body;

	if (id != req.usuarioToken.sub) {

		return res.status(500).send({ mensaje: "No tienes permisos para actualizar este usuario" })

	}

	//Recorremos la base de datos con el método findByIdAndUpdate

	Usuarios.findByIdAndUpdate(id, actualizar, (error, usuarioActualizado) => {

		if (error) {

			res.status(500).send({ mensaje: "Error al actualizar el usuario" })
		}

		else {

			if (!usuarioActualizado) {

				res.status(404).send({ mensaje: "No se ha podido actualizar el usuario" })

			} else {

				res.status(200).send({ usuarioActualizado })
			}

		}

	})

}

//Método para borrar usuario
function borrarUsuario(req, res) {

	var id = req.params.id;

	if (id != req.usuarioToken.sub) {

		return res.status(500).send({ mensaje: "No tienes permisos para actualizar este usuario" })

	}

	//Recorremos la base de datos con el método findByIdAndRemove
	Usuarios.findByIdAndRemove(id, (error, usuarioBorrado) => {

		if (error) {

			res.status(500).send({ mensaje: "Error al borrar el usuario" })

		} else {

			if (!usuarioBorrado) {

				res.status(404).send({ mensaje: "No se ha podido borrado el usuario" })

			} else {

				res.status(200).send({ usuarioBorrado })
			}

		}

	})


}

//Exportamos los métodos del módulo
module.exports = {
	pruebaUsuarios,
	crearUsuarios,
	ingresoUsuario,
	actualizarUsuario,
	mostrarUsuario,
	borrarUsuario
}