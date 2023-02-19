const Tag = require("../models/tag");

//Info
exports.tag_list = function (req, res, next) {
    //Returns all tags sorted by name
    Tag.find()
      .sort([["name", "ascending"]])
      .exec(function (err, tags) {
        if (err) {
          return next(err);
        }
        //Successful, so send response as JSON
        res.json(list_tags);
      });
  };

//Create
exports.tag_create_post = function (req, res, next) {
  //Needs to be sanitized
  const tag = new Tag({
    name: req.body.name,
    description: req.body.description,
  });
  cheatsheet.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(tag.url);
  });
};

exports.tag_detail = function (req, res, next) {
    Tag.findById(req.params.id, (err, results) => {
      if (err) {
        return next(err);
      }
      res.json(results);
    })
  }

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
//Should check if a tag with the same name already exists
exports.tag_update_get = function (req, res, next) {
  Tag.findById(req.params.id, function (err, tag_details) {
    if (err) {
      return next(err);
    }
    //Successful, so send response as JSON
    res.json(tag_details);
  });
};
exports.tag_update_post = function (req, res, next) {
  //Needs to be sanitized
  const tag = new Tag({
    name: req.body.name,
    description: req.body.description,
    _id: req.params.id,
  });
  Tag.findByIdAndUpdate(
    req.params.id,
    tag,
    {},
    (err, thetag) => {
      if (err) {
        return next(err);
      }
      //Successful, so redirect
      res.redirect(tag.url);
    }
  );
};
