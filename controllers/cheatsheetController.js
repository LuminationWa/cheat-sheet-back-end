const Cheatsheet = require("../models/cheatsheet");
const Tag = require("../models/tag");

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
  })
}

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

exports.cheatsheet_create_post = function (req, res, next) {
  //Needs to be sanitized
  const cheatsheet = new Cheatsheet({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
  });
  cheatsheet.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(cheatsheet.url);
  });
};

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

exports.cheatsheet_update_post = function (req, res, next) {
  //Needs to be sanitized
  const cheatsheet = new Cheatsheet({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    _id: req.params.id,
  });
  Cheatsheet.findByIdAndUpdate(
    req.params.id,
    cheatsheet,
    {},
    (err, thecheatsheet) => {
      if (err) {
        return next(err);
      }
      //Successful, so redirect
      res.redirect(cheatsheet.url);
    }
  );
};
