let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

//enable JWT
let jwt = require("jsonwebtoken");
let DB = require("../config/db");

//define user model nstance
let userModel = require("../models/user");
let User = userModel.User; //alias

module.exports.displayHomePage = (req, res, next) => {
  res.render("index", {
    title: "Home",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayAboutPage = function (req, res, next) {
  res.render("about", {
    title: "About",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayProjectsPage = function (req, res, next) {
  res.render("projects", {
    title: "Projects",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayServicesPage = function (req, res, next) {
  res.render("references", {
    title: "References",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayContactPage = function (req, res, next) {
  res.render("myContact", {
    title: "My Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayLoginPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/contact-list");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //server error
    if (err) {
      return next(err);
    }
    //if user login error
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
      };

      const authToken = jwt.sign(payload, DB.Secret, {
        expiresIn: 604800, //1week
      });
      /*  res.json({
        success: true,
        msg: "User Logged in successfully",
        user: {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email,
        },
        token,
        authToken,
      }); */

      return res.redirect("/contact-list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  //to check if user is not already logged in
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  //instantiate a user object
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting new User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registrationMessage",
          "Registration Error :User Already Exists!"
        );
        console.log("Error:User Already exists");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : "",
      });
    } else {
      //if no error exists, then registration is successful

      //redirect the user and authenticate them
      /* res.json({ success: true, msg: "User Registered successfully" }); */

      return passport.authenticate("local")(req, res, () => {
        res.redirect("/contact-list");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
