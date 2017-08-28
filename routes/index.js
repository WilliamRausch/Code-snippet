const express = require("express");
const router = express.Router();
const fs = require("fs");
const Snippet = require("../models/snippet");
let snippets;


router.get("/",function(req,res){
	    Snippet.find({})
    .then(function(snippets) {
        // console.log('stuff');
        console.log(snippets);
        res.render("index", {snippets: snippets});
    })
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
	// Snippet.find({})
	// .exec(function(err,results){
	// 	if(err){
	// 		console.log("error")
	// 	}else{
	// 		console.log(results);
	// 		snippets = results;
	// 		console.log(snippets[0]);
	// 	}
	// })
	res.redirect("/");
})
router.post("/edit",function(req,res){
const snippet = new Snippet({name: `${req.body.name}`});
snippet.save()
  .then(function () {
    console.log(snippet);
  })
  .catch(function () {
    console.log("error");
  });
	Snippet.find({})
	.exec(function(err,results){
		if(err){
			console.log("error")
		}else{
			console.log(results);
			snippets = results;
			console.log(snippets[0]);
		}
	})
	res.redirect("/");
})
router.delete("/:name",function(req,res){
	Snippet.deleteOne({name: `${req.body.name}`})
	console.log("deleting"+req.body.name);
	Snippet.find({})
	.exec(function(err,results){
		if(err){
			console.log("error")
		}else{
			console.log(results);
			snippets = results;
			//console.log(snippets[0]);
		}
	})
	res.redirect("/");
})
module.exports = router;