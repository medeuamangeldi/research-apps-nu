const express = require("express"),
      app = express(),
      bodyParser = require('body-parser'),
      port = 3000;

var nj = require('numjs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(process.env.PORT || port, function(req, res){
    console.log("Listening on port " + port);
});

app.get("/", function(req, res){
    res.render("pages/main");
});

app.get("/apps", function(req, res){
    res.render("pages/apps");
});

app.get("/pump", function(req, res){
    res.render("pages/pump", {OutputLabel: JSON.stringify([5, 4, 2, 0.5]), OutputData: JSON.stringify([5, 4, 2, 0.5]), inputData: [5, 4, 2, 0.5], labelData: ['5', '4', '2', '0.5']});
});

app.get("/about", function(req, res){
    res.render("pages/about");
});

app.post("/run", function(req, res){
    var input_data;
    var label_data;

    const a = req.body.a,
          b = req.body.b, 
          c = req.body.c, 
          d = req.body.d, 
          e = req.body.e, 
          rad = req.body.rad;
    
    var Domain = nj.arange(0, rad, 0.1).tolist();

    var someFunction = function(x) {
      return a+(b-a)*(1+(c*x)**d)**((e-1)/d);  
    };
    
    var makeStr = function(x) {
        return x.toString();
    };

    var makeFloat = function(x) {
        return parseFloat(x);
    };

    var Range = Domain.map(someFunction);

    label_data = Domain.map(makeStr);
    input_data = Range.map(makeFloat);

    res.render("pages/pump", {OutputLabel: JSON.stringify(Domain), OutputData: JSON.stringify(input_data), inputData: input_data, labelData: label_data});

});