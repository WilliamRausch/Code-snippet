const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snippetSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: false },
	body: {type: String, required: true, unique: false},
	notes: {type: String, required: false, unique: false},
	language: {type: String, required: true, unique: false},
	tag: {type: String, required: true, unique: false},
	user: {type: String, required: true, unique: false},
})

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;