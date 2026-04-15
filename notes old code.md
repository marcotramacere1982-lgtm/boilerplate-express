let bodyParser = require('body-parser');
let express = require('express');
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {

  const method = req.method;
  const path = req.path;
  const ip = req.ip;

  console.log(`${method} ${path} - ${ip}`);
   next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
//  res.send("Hello Express");
const absolutePath = __dirname + "/views/index.html";
res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
let message = "Hello json";
  

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({
    "message": message
  });
});

app.get("/now", (req, res, next) => {
  
  req.time = new Date().toString();
  next(); 
}, (req, res) => {
   res.json({
    time: req.time
  });
});
app.get("/:word/echo", (req, res) => {

  const word = req.params.word;

  res.json({
    echo: word
  });
});

app.get("/name", function(req, res) {
  // GET uses req.query
  var firstName = req.query.first;
  var lastName = req.query.last;
  res.json({
    name: firstName + " " + lastName
  });
});

app.post("/name", function(req, res) {
  // 1. Explicitly pull the data
  var first = req.body.first;
  var last = req.body.last;
  
  // 2. Build the object exactly as requested
  var result = { 
    name: first + " " + last 
  };
  
  // 3. Send it
  res.json(result);
});
module.exports = app;