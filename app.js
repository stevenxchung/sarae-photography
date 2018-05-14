// Import environment variables
require("dotenv").config();

// Initialize Libraries
var express = require("express"),
    app = express(),
    nodeMailer = require("nodemailer"),
    bodyParser = require("body-parser");

// Use ejs files for views
app.set("view engine", "ejs");

// Serving static files from public folder
app.use(express.static(__dirname + "/public"));

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
})

// GET - Contact page
app.get("/contact", function(req, res) {
  res.render("contact");
})

// POST - When form submits send as email to owner
app.post('/contact', function(req, res) {
  // Create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    service: 'Gmail',
      auth: {
        user: 'aircamp.forgot@gmail.com',
        pass: process.env.GMAILPW
      }
  });

  // Setup email data with unicode symbols
  let mailOptions = {
    from: req.body.email, // Client's email
    to: '"Sarae Ang" <aircamp.forgot@gmail.com>', // Owner
    subject: req.body.subject, // Subject line
    text: req.body.description // Email body
  }

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log("Message %s sent %s", info.messageId, info.response);
    // req.flash('success', 'Success! Your email has been sent.');
    res.render('landing');
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server is live!");
  console.log("PORT: " + process.env.PORT + " / " + "IP: " + process.env.IP);
});
