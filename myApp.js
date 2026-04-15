let express = require('express');
let app = express();
console.log("Hello World");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", function(req, res) {
//  res.send("Hello Express");
const absolutePath = __dirname + "/views/index.html";
res.sendFile(absolutePath);
});
// This creates a new listener at the /json endpoint
app.get("/json", (req, res) => {

  res.json({
    "message": "Hello json"
  });
});

































 module.exports = app;
