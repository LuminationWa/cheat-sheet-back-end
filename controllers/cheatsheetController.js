const Cheatsheet = require("../models/cheatsheet");
const Tag = require("../models/tag");
const { body, validationResult } = require("express-validator");

//Information
exports.cheatsheet_list = function (req, res, next) {
  //Returns all cheatshets sorted by name
  Cheatsheet.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_cheatsheets) {
      if (err) {
        return next(err);
      }
      //Successful, so send response as JSON
      res.json(list_cheatsheets);
    });
};

exports.cheatsheet_detail = function (req, res, next) {
  Cheatsheet.findById(req.params.id, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

//Create

exports.cheatsheet_create_get = function (req, res, next) {
  //Returns all tags so they can be choosed from
  Tag.find().exec(function (err, list_tags) {
    if (err) {
      return next(err);
    }
    //Successful, so send response as JSON
    res.json(list_cheatsheets);
  });
};

exports.cheatsheet_create_post = [
  //Sanitizes fields and if there's no errors creates a new cheatsheet, saves it and redirects user to its url
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description").optional().trim().escape(),
  body("tags").optional().isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    const cheatsheet = new Cheatsheet({
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags,
    });
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      cheatsheet.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(cheatsheet.url);
      });
    }
  },
];

//Delete

exports.cheatsheet_delete_get = function (req, res, next) {
  Cheatsheet.findById(req.params.id, function (err, cheatsheet_details) {
    if (err) {
      return next(err);
    }
    //Successful, so send response as JSON
    res.json(cheatsheet_details);
  });
};

exports.cheatsheet_delete_post = function (req, res, next) {
  Cheatsheet.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    //Sucessful, so redirect
    res.redirect("/");
  });
};

//Update

exports.cheatsheet_update_get = function (req, res, next) {
  Cheatsheet.findById(req.params.id, function (err, cheatsheet_details) {
    if (err) {
      return next(err);
    }
    //Successful, so send response as JSON
    res.json(cheatsheet_details);
  });
};

exports.cheatsheet_update_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must be alphanumeric.")
    .optional()
    .isAlphanumeric()
    .escape(),
  body("tags", "Tags must be alphanumeric.")
    .optional()
    .isAlphanumeric()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    // Create a new cheatsheet object with escaped and trimmed data.
    const cheatsheet = new Cheatsheet({
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      res.json(errors);
    } else {
      // Data from form is valid. Update the record.
      Cheatsheet.findByIdAndUpdate(
        req.params.id,
        cheatsheet,
        {},
        (err, thecheatsheet) => {
          if (err) {
            return next(err);
          }
          //Successful, so redirect to updated cheatsheet detail page
          res.redirect(thecheatsheet.url);
        }
      );
    }
  },
];
