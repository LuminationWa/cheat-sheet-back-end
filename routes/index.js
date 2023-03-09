var express = require("express");
var session = require("express-session");
const passport = require("passport");
var router = express.Router();
const cheatsheet_controller = require("../controllers/cheatsheetController");
const subdivision_controller = require("../controllers/subdivisionController");
const tag_controller = require("../controllers/tagController");
const auth_controller = require("../controllers/authController");
const bcrypt = require("bcryptjs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/// Auth routes ///

//Sign up
router.post("/sign-up", auth_controller.signup_post);

//Log in
router.post("/log-in", auth_controller.login_post);

//Log out
router.get("/log-out", auth_controller.logout_get);

/// Cheatsheet routes ///

//Information
router.get("/cheatsheets", cheatsheet_controller.cheatsheet_list);
router.get("/cheatsheet/:id", cheatsheet_controller.cheatsheet_detail);

// Create
router.get("/cheatsheet/create", cheatsheet_controller.cheatsheet_create_get);
router.post("/cheatsheet/create", cheatsheet_controller.cheatsheet_create_post);

//Delete
router.get(
  "/cheatsheet/:id/delete",
  cheatsheet_controller.cheatsheet_delete_get
);
router.post(
  "/cheatsheet/:id/delete",
  cheatsheet_controller.cheatsheet_delete_post
);

//Update
router.get(
  "/cheatsheet/:id/update",
  cheatsheet_controller.cheatsheet_update_get
);
router.post(
  "/cheatsheet/:id/update",
  cheatsheet_controller.cheatsheet_update_post
);

/// Tag routes ///

//Info
router.get("/tags", tag_controller.tag_list);
router.get("/tag/:id", tag_controller.tag_detail);

//Create
//No need for get
router.post("/tag/create", tag_controller.tag_create_post);

//Delete
router.get("/tag/:id/delete", tag_controller.tag_delete_get);
router.post("/tag/:id/delete", tag_controller.tag_delete_post);

//Update
router.get("/tag/:id/update", tag_controller.tag_update_get);
router.post("/tag/:id/update", tag_controller.tag_update_post);

/// Subdivision routes ///

//Info
router.get("/subdivisions", subdivision_controller.subdivision_list);
router.get("/subdivision/:id", subdivision_controller.subdivision_detail);

// Create
router.post(
  "/subdivision/create",
  subdivision_controller.subdivision_create_post
);

//Delete
router.get(
  "/subdivision/:id/delete",
  subdivision_controller.subdivision_delete_get
);
router.post(
  "/subdivision/:id/delete",
  subdivision_controller.subdivision_delete_post
);

//Update
router.get(
  "/subdivision/:id/update",
  subdivision_controller.subdivision_update_get
);
router.post(
  "/subdivision/:id/update",
  subdivision_controller.subdivision_update_post
);

module.exports = router;
