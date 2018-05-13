// Import environment variables
require("dotenv").config();

// Initialize Libraries
var express = require("express"),
    app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/gallery", function(req, res) {
  res.render("gallery");
})

app.get("/contact", function(req, res) {
  res.render("contact");
})

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server is live!");
  console.log("PORT: " + process.env.PORT + " / " + "IP: " + process.env.IP);
});
