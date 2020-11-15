let express = require("express");
let router = express.Router();

let indexController = require("../controllers/index");
/* GET home page. */
router.get("/", indexController.displayHomePage);

router.get("/home", indexController.displayHomePage);

/* GET About page. */
router.get("/about", indexController.displayAboutPage);

/* GET references page. */
router.get("/references", indexController.displayServicesPage);

/* GET Projects page. */
router.get("/projects", indexController.displayProjectsPage);

/* GET Contact us page. */
router.get("/myContact", indexController.displayContactPage);

//Get route for displaying login Page
router.get("/login", indexController.displayLoginPage);

//POST route for processing login Page
router.post("/login", indexController.processLoginPage);

//Get route for displaying register page
router.get("/register", indexController.displayRegisterPage);

//POST route for processing register page
router.post("/register", indexController.processRegisterPage);

//get route to perform logout
router.get("/logout", indexController.performLogout);

module.exports = router;
