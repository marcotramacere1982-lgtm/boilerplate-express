require('dotenv').config();
let express = require('express');
let app = express();
//console.log("Hello World");
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
// This creates a new listener at the /json endpoint
app.get("/json", (req, res) => {
let message = "Hello json";
  
  // 2. Check the "switch" inside the handler
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({
    "message": message
  });
});

app.get("/now", (req, res, next) => {
  // 1. Logic: Generate the time and attach it to the request object
  req.time = new Date().toString();
  next(); 
}, (req, res) => {
  // 2. Output: Send the object to the browser
  // Optional: console.log(req.time); // This would make it show in the terminal!
  res.json({
    time: req.time
  });
});

module.exports = app;































 module.exports = app;
