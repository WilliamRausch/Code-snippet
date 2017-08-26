const express = require("express");
const router = express.Router();
const fs = require("fs");
const Snippet = require("../models/snippet");


router.get("/",function(req,res){
	res.render("index");
})

router.post("/create",function(req,res){
const snippet = new Snippet({name: `${req.body.name}`});
snippet.save()
  .then(function () {
    console.log(snippet);
  })
  .catch(function () {
    console.log("error");
  });
	console.log(req.body.name);
	console.log(snippet);
	res.redirect("/");
const snippets = Snippet.find()
	 .then(function () {
    console.log(snippets);
  })
  .catch(function () {
    console.log("error");
  });
})
module.exports = router;