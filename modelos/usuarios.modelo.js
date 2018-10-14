"use strict"

//Requerimos la dependencia Mongoose para acceder a la base de datos
var mongoose = require('mongoose');
// El objeto de tipo Esquema nos permite guardar en una colección concreta y en un documento concreto dentro de esa colección
var Schema = mongoose.Schema;
// Plugin para validar unico corrico
//var uniqueValidator = require('mongoose-unique-validator');

var rolesValidos = {
	values:['ADMIN_ROLE','TEACHER_ROLE',"STUDENT_ROLE"],
	message: '{VALUE} no es un role permitido'
};

//Creamos el Esquema con los respectivos atributos
var UsuariosSchema = Schema({
	
	usuario: { type:String, required:[true,'El nombre es necesario'] },
	name: { type:String, required:[true,'El nombre es necesario'] },
	//lastname: { type:String, required:[true,'El apellido es necesario'] },
	email: { type:String,  required:[true,'El correo es necesario'] },
	password:{ type:String, required:[true,'El contraseña es necesaria'] },
	imagen: { type:String, required:false },
	role: { type:String, required:true, default:"TEACHER_ROLE", enum: rolesValidos },
	escuela: { type:String, required:[true,'La escuela es requerida'] },
});

//UsuariosSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

// El objeto Usuarios va poder ser instanciado y automáticamente le vamos asignando los valores del Esquema
module.exports = mongoose.model("Usuarios", UsuariosSchema);


