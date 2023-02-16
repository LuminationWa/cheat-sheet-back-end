var express = require('express');
var router = express.Router();
const cheatsheet_controller = require("../controllers/cheatsheetController");
const subdivision_controller = require("../controllers/subdivisionController");
const tag_controller = require("../controllers/tagController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/// Cheatsheet routes ///

//Tags
// Create
router.post("/cheatsheet/create", cheatsheet_controller.cheatsheet_create_get);
router.post("/cheatsheet/create", cheatsheet_controller.cheatsheet_create_post);

//Delete
router.get("/cheatsheet/:id/delete", cheatsheet_controller.cheatsheet_delete_get);
router.post("/cheatsheet/:id/delete", cheatsheet_controller.cheatsheet_delete_post);

//Update
router.get("/cheatsheet/:id/update", cheatsheet_controller.cheatsheet_update_get);
router.post("/cheatsheet/:id/update", cheatsheet_controller.cheatsheet_update_post);

// //Individual cheatsheet
// router.get("/cheatsheet/:id", cheatsheet_controller.cheatsheet_detail);

//Cheatsheet list
router.get("/cheatsheets", cheatsheet_controller.cheatsheet_list);


// /// Tag routes ///

// // Create
// router.get("/tag/create", tag_controller.tag_create_get);
// router.post("/tag/create", tag_controller.tag_create_post);

// //Delete
// router.get("/tag/:id/delete", tag_controller.tag_delete_get);
// router.post("/tag/:id/delete", tag_controller.tag_delete_post);

// //Update
// router.get("/tag/:id/update", tag_controller.tag_update_get);
// router.post("/tag/:id/update", tag_controller.tag_update_post);

// //Individual tag
// router.get("/tag/:id", tag_controller.tag_detail);

// //Tag list
// router.get("/tags", tag_controller.tag_list);


// /// Subdivision routes ///

// // Create
// router.get("/subdivision/create", subdivision_controller.subdivision_create_get);
// router.post("/subdivision/create", subdivision_controller.subdivision_create_post);

// //Delete
// router.get("/subdivision/:id/delete", subdivision_controller.subdivision_delete_get);
// router.post("/subdivision/:id/delete", subdivision_controller.subdivision_delete_post);

// //Update
// router.get("/subdivision/:id/update", subdivision_controller.subdivision_update_get);
// router.post("/subdivision/:id/update", subdivision_controller.subdivision_update_post);

// //Individual subdivision
// router.get("/subdivision/:id", subdivision_controller.subdivision_detail);

// //subdivision list
// router.get("/subdivisions", subdivision_controller.subdivision_list);

module.exports = router;
