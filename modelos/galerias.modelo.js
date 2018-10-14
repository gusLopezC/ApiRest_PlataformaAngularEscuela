"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GaleriasSchema = Schema({
	foto: String
})

module.exports = mongoose.model("Galerias", GaleriasSchema);