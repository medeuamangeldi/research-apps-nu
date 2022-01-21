const express = require("express"),
      app = express(),
      bodyParser = require('body-parser'),
      {spawn} = require('child_process'),
      port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(port, function(req, res){
    console.log("Listening on port " + port);
});

app.get("/", function(req, res){
    res.render("pages/main");
});

app.get("/apps", function(req, res){
    res.render("pages/apps");
});

app.get("/pump", function(req, res){
    res.render("pages/pump");
});

app.get("/about", function(req, res){
    res.render("pages/about");
});