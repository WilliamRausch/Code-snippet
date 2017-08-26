const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: false }
})

const Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = Snippet;