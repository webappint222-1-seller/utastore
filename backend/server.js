const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('etc/key.pem'),
  cert: fs.readFileSync('etc/cert.pem')
};

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Look like your server is working! " });
});

require("./app/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3006;

app.use((req, res) => {
  res.writeHead(200);
  res.end("hello world\n");
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

https.createServer(options, app).listen(PORT);