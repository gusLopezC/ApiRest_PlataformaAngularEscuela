"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SlidesExamenes = Schema({
	nombre: { type: String, required: [true, 'El	nombre	es	necesario'] },
	imagen: { type: String, required: false },
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios', required: true },
	grupo: {type: Schema.Types.ObjectId, ref: 'Grupos', required: [true, 'El	id	Grupos es	un	campo	obligatorio']	}
})

module.exports = mongoose.model("Examenes", SlidesExamenes);