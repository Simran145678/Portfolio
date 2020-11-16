let express = require("express");

let router = express.Router();

let mongoose = require("mongoose");

let jwt = require("jsonwebtoken");

let passport = require("passport");
//connect to contact model

//helper function for guard purposes

function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}
let contactController = require("../controllers/contact");
//get route for Contact List Page -READ opeartion
router.get("/", contactController.displayContactList);

//get route for displaying Contact ADD Page -CREATE opeartion
router.get("/add", requireAuth, contactController.displayAddPage);

//POST route for processing Contact List Page -create opeartion
router.post("/add", requireAuth, contactController.processAddPage);

//get route for displaying Contact EDIT Page -update opeartion
router.get("/edit/:id", requireAuth, contactController.displayEditPage);

//POST route for processing Contact EDIT Page -update opeartion
router.post("/edit/:id", requireAuth, contactController.processEditPage);

//get route to perform Contact deletion opeartion
router.get("/delete/:id", requireAuth, contactController.performDelete);

module.exports = router;
