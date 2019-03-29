const express = require('express');
const bodyParser = require('body-parser');
const upload = require("express-fileupload");
const path = require('path');
var PORT = process.env.PORT || 3000;

var app = express();
app.use(upload());
app.use(bodyParser.json()); // URL encoded for values in BODY during POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, function () {
    console.log("Server started on port " + PORT + "...");
});

var globalId = 0;
var imageList = [];

// ROUTING
app.post('/fileUpload', function (req, res) {
    var currentDate = new Date();
    var randomNameForFile = currentDate.toDateString() + "_" + Math.random().toString(36).substring(7) + "_" +Math.random().toString(36).substring(7)+ "_";
    try {
        if(req.files) {
            req.files.image.mv("uploads/"+randomNameForFile+'_'+req.files.image.name, async function(err) {
                if(err) {
                    res.send("Error Occureds!");
                } else {
                    imageList.push({
                        id: globalId++, imageUrl: randomNameForFile+'_'+req.files.image.name
                    });
                    console.log(imageList);
                    res.send(imageList);
                }
            });
        }
    } catch(e) {
        console.log(e);
    }
});

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});
