"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SlidesExamenes = Schema({
	imagen: String,
	titulo: String,
	descripcion: String
})

module.exports = mongoose.model("Examenes", SlidesExamenes);