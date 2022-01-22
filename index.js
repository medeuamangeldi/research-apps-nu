const express = require("express"),
      app = express(),
      bodyParser = require('body-parser'),
      {spawn} = require('child_process'),
      port = 3000;

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
    res.render("pages/pump", {OutputLabel: JSON.stringify([5, 4, 2, 0.5]), OutputData: JSON.stringify([5, 4, 2, 0.5]), inputData: JSON.stringify([5, 4, 2, 0.5]), labelData: JSON.stringify([5, 4, 2, 0.5])});
});

app.get("/about", function(req, res){
    res.render("pages/about");
});

app.post("/run", function(req, res){
    var dataToSend;
    var input_data;
    var label_data;

    const a = req.body.a,
          b = req.body.b,
          c = req.body.c, 
          d = req.body.d, 
          e = req.body.e,
          rad = req.body.rad; 

    const python = spawn('python', ['public/script.py', a, b, c, d, e, rad]);
    // req.body.tokensNumber, req.body.topP
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        const arrays = dataToSend.split('%');
        input_data = arrays[1];
        label_data = arrays[0];
       });

    python.on('exit', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        res.render("pages/pump", {OutputLabel: label_data, OutputData: input_data, inputData: input_data, labelData: label_data});
    });

});