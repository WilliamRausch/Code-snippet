const express = require("express");
const router = express.Router();
const fs = require("fs");
const Snippet = require("../models/snippet");
let snippets;
const User = require("../models/user");

const passport = require('passport');
const bcrypt = require('bcryptjs');

const requireLogin = function (req, res, next) {
  if (req.user) {
    next()
  } else {
    res.redirect('/');
  }
};

const login = function (req, res, next) {
  if (req.user) {
    res.redirect("/index")
  } else {
    next();
  }
};

router.get("/",  function(req, res) {
  res.render("login");
});

router.post('/login', passport.authenticate('local', {

    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get("/login", login,  function(req, res){
  
    res.render('login');
 

})


router.get("/signup", function(req, res) {
  res.render("signup");
});



router.post("/signup", function(req, res) {
  //console.log(bcrypt.hashSync(req.body.password, 8));
  User.create({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,

  }).then(function(data) {
    console.log(data);
    res.redirect("/index");
  })
  .catch(function(err) {
    console.log(err);
    res.redirect("/signup");
  });
});




router.get("/index", requireLogin, function(req,res){
      console.log(req.user.username);
	    Snippet.find({ user: req.user.username})
    .then(function(snippets) {
        // console.log('stuff');
        console.log(snippets);
        res.render("index", {snippets: snippets});
    })
})


router.get("/create",function(req,res){
// const snippet = new Snippet({name: `${req.body.name}`});
// snippet.save()
//   .then(function () {
//     console.log(snippet);
//   })
//   .catch(function () {
//     console.log("error");
//   });
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
	res.render("new");
})
router.post("/create/new", function(req,res){
	//let tags = `${req.body.tag}`;

	Snippet.create({
		name: req.body.name,
		body: req.body.body,
		language: req.body.language,
		notes: req.body.notes,
		tag: req.body.tag,
		user: req.user.username

	}).then(function(snippet){
		res.redirect("/index");
	})
})
router.get("/edit",function(req,res){
	res.render("edit");

})
router.get("/delete/:id",function(req,res){
	Snippet.deleteOne({_id: `${req.params.id}`}).then(function(snippet){
		res.redirect("/index");

	})
	
	
})
router.post("/languageFiltered",function(req,res){
	console.log(req.body.language)
	if(req.body.language){
	    Snippet.find({language: req.body.language})
	
    .then(function(snippets) {
        // console.log('stuff');
        console.log(snippets);
        res.render("index", {snippets: snippets});
    })
}else{
	res.redirect("/index");
}
})
router.post("/tagFiltered",function(req,res){
  console.log(req.body.tags)
  if(req.body.tags){
      Snippet.find({tag: req.body.tags})
  
    .then(function(snippets) {
        // console.log('stuff');
        console.log(snippets);
        res.render("index", {snippets: snippets});
    })
}else{
  res.redirect("/index");
}
})
router.get("/view/:snippetid",function(req,res){
  Snippet.findOne({_id: `${req.params.snippetid}`}).then(function(snippet){
    res.render("show", {snippet: snippet});
  })
})
router.get("/edit/:snippetid",function(req,res){
  Snippet.findOne({_id: `${req.params.snippetid}`}).then(function(snippet){
    res.render("edit", {snippet: snippet});
  })
})
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});


module.exports = router;