"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GruposSchema = Schema({
	imagen: String,
	titulo: String,
	descripcion: String
})

module.exports = mongoose.model("Grupos", GruposSchema);