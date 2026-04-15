let bodyParser = require('body-parser');
let express = require('express');
let app = express();

app.use(function(req, res, next) {

  const method = req.method;
  const path = req.path;
  const ip = req.ip;

  console.log(`${method} ${path} - ${ip}`);
   next();
});

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
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

app.get("/name", (req, res) => {
  res.json({ 
    name: req.query.first + " " + req.query.last 
  });
});

app.post("/name", (req, res) => {
  res.json({ 
    name: req.body.first + " " + req.body.last 
  });
});


module.exports = app;































 module.exports = app;
