// Import environment variables
require("dotenv").config();

// Initialize Libraries
var express = require("express"),
    app = express(),
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

});

// POST - Password change route + user authentication
router.post('/change', middleware.isLoggedIn, function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({}, function(err, user) {
        if (!user) {
          // Testing password change
          console.log(user);
          console.log(typeof user);
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    // Drying code by using emailUser function
    emailUser
  ], function(err) {
    req.flash('success', 'Success! Your password has been changed.');
    res.redirect('/campgrounds');
  });
});

function emailUser(user, done) {
  var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'aircamp.forgot@gmail.com',
      pass: process.env.GMAILPW
    }
  });
  var mailOptions = {
    to: user.email,
    from: 'aircamp.forgot@gmail.com',
    subject: 'Your password has been changed',
    text: 'Hello ' + user.userDisplay + ',\n\n' +
      'This is a confirmation that the password for your account ' + user.email + ' on AirCamp has just been changed.\n'
  };
  smtpTransport.sendMail(mailOptions, function(err) {
    done(err);
  });
  done();
}

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server is live!");
  console.log("PORT: " + process.env.PORT + " / " + "IP: " + process.env.IP);
});
