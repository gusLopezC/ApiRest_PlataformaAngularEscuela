"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GruposSchema = Schema({
	nombre: { type: String, required: [true, 'El	nombre	es	necesario'] },
	descripcion: { type: String, required: [true, 'El	nombre	es	necesario'] },
	imagen: { type: String, required: false },
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuarios' }
})

module.exports = mongoose.model("Grupos", GruposSchema);