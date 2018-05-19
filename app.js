// Import environment variables
require("dotenv").config();

// Initialize Libraries
var express = require("express"),
    app = express(),
    async = require("async"),
    nodeMailer = require("nodemailer"),
    bodyParser = require("body-parser");

// Use ejs files for views
app.set("view engine", "ejs");

// Serving static files from public and scripts from a scripts folder
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/scripts"));


// Enable body parser to retrieve form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ============
// Routes
// ============

// GET - Landing page
app.get("/", function(req, res) {
  res.render("landing");
});

// GET - Gallery page
app.get("/gallery", function(req, res) {
  res.render("gallery");
});

// GET - Contact page
app.get("/contact", function(req, res) {
  res.render("contact");
});

// POST - Contact form
app.post("/contact", function(req, res) {
  async.waterfall([
    function emailUser(done) {
      var smtpTransport = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL,
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: process.env.GMAIL,
        from: "Your Customer",
        subject: "INQUIRY: " + req.body.subject,
        text: "FROM: " + req.body.email + " (" + req.body.name + ");\n\n" +
        req.body.description
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        done(err);
      });
      done();
    }
  ], function(err) {
    console.log('Success! Your message has been sent!');
    res.redirect('/');
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server is live!");
  console.log("PORT: " + process.env.PORT + " / " + "IP: " + process.env.IP);
});
