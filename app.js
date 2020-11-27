var express = require("express");
var fs = require("fs");
const https = require('https');
const http = require("http");

const cert = fs.readFileSync("./ssl/rclemsmith_me.crt");
const ca = fs.readFileSync('./ssl/rclemsmith_me.ca-bundle');
const key = fs.readFileSync('./ssl/private.key');

const httpsOptions = {cert, ca, key};
var app = express();

const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);
app.use((req, res, next) => {
    
    if(req.protocol === 'http') {
        console.log("Incoming");
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
 });
 app.use(express.static(__dirname + '/'));





app.get('/', function (req, res) {
    console.log("Incoming");
    res.sendFile("index.html");
});

httpServer.listen(80, () => console.log("Http Server Started"));
httpsServer.listen(443,()=>console.log("Https Server Started"));