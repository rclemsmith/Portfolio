var express = require("express");
var fs = require("fs");
const https = require('https');

const cert = fs.readFileSync("rclemsmith_me.crt");
const ca = fs.readFileSync('rclemsmith_me.ca-bundle');
const key = fs.readFileSync('private.key');
var app = express();

const httpsOptions = {cert, ca, key};
const httpsServer = https.createServer(httpsOptions, app);
app.use(express.static(__dirname + '/'));

app.use((req, res, next) => {
    console.log("Incoming");
    if(req.protocol === 'http') {
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
 });


app.get('/', function (req, res) {
    console.log("Incoming");
    res.sendFile("index.html");
});

httpsServer.listen(80, () => console.log("Server Started"));