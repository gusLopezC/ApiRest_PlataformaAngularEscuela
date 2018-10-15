"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GruposSchema = Schema({
	nombre: { type: String, required: [true, 'El	nombre	es	necesario'] },
	descripcion: { type: String, required: [true, 'El	nombre	es	necesario'] },
	img: { type: String, required: false },
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
})

module.exports = mongoose.model("Grupos", GruposSchema);