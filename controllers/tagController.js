const Tag = require("../models/tag");
const { body, validationResult } = require("express-validator");

//Info
exports.tag_list = function (req, res, next) {
  //Returns all tags sorted by name
  Tag.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_tags) {
      if (err) {
        return next(err);
      }
      //Successful, so send response as JSON
      res.json(list_tags);
    });
};

exports.tag_detail = function (req, res, next) {
  Tag.findById(req.params.id, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

//Create
exports.tag_create_post = [
  //Fist validates the name field, then checks if genre already exists and if it passes both checks saves new tag
  body("name", "Tag name required").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const tag = new Tag({
      name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      res.json(results);
    } else {
      Tag.findOne({ name: req.body.name }).exec((err, found_tag) => {
        if (err) {
          return next(err);
        }
        if (found_tag) {
          //Tag already exists
          res.redirect(found_tag.url);
        } else {
          tag.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect(tag.url);
          });
        }
      });
    }
  },
];

//Delete
//Should check if there's cheatsheets assigned and if so not allow the post
exports.tag_delete_get = function (req, res, next) {
  Tag.findById(req.params.id, function (err, tag_details) {
    if (err) {
      return next(err);
    }
    //Successful, so send response as JSON
    res.json(tag_details);
  });
};
exports.tag_delete_post = function (req, res, next) {
  Tag.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    //Sucessful, so redirect
    res.redirect("/");
  });
};

//Update
exports.tag_update_get = function (req, res, next) {
  Tag.findById(req.params.id, function (err, tag_details) {
    if (err) {
      return next(err);
    }
    //Successful, so send response as JSON
    res.json(tag_details);
  });
};
exports.tag_update_post = [
  //First validates name field, then if there's no errors checks if the tag exists, and if it does updates it and redirects user
  body("name", "Tag name required").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const tag = new Tag({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      Tag.findByIdAndUpdate(req.params.id, tag, {}, (err, thetag) => {
        if (err) {
          return next(err);
        }
        //Successful, so redirect
        res.redirect(thetag.url);
      });
    }
  },
];
