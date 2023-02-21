const Subdivision = require("../models/subdivision");

//Info
exports.subdivision_list = function (req, res, next) {
  //Returns all tags sorted by name
  Subdivision.find()
    .sort([["name", "ascending"]])
    .exec(function (err, tags) {
      if (err) {
        return next(err);
      }
      //Successful, so send response as JSON
      res.json(list_subdivisions);
    });
};

exports.subdivision_detail = function (req, res, next) {
  Subdivision.findById(req.params.id, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

//Create
exports.subdivision_create_post = function (req, res, next) {
  //Needs to be sanitized
  const subdivison = new Subdivision({
    name: req.body.name,
    description: req.body.description,
  });
  subdivison.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(subdivison.url);
  });
};

//Delete
exports.subdivision_delete_get = function (req, res, next) {
  Subdivision.findById(req.params.id, function (err, subdivision_details) {
    if (err) {
      return next(err);
    }
    //Successful, so send response as JSON
    res.json(subdivision_details);
  });
};
exports.subdivision_delete_post = function (req, res, next) {
  Subdivision.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    //Sucessful, so redirect
    res.redirect("/");
  });
};

//Update
//Should check if a subdivision with the same name already exists
exports.subdivision_update_get = function (req, res, next) {
  Subdivision.findById(req.params.id, function (err, subdivision_details) {
    if (err) {
      return next(err);
    }
    //Successful, so send response as JSON
    res.json(subdivision_details);
  });
};
exports.subdivision_update_post = function (req, res, next) {
  //Needs to be sanitized
  const subdivision = new Subdivision({
    name: req.body.name,
    description: req.body.description,
    _id: req.params.id,
  });
  Subdivision.findByIdAndUpdate(req.params.id, subdivision, {}, (err, thesubdivision) => {
    if (err) {
      return next(err);
    }
    //Successful, so redirect
    res.redirect(subdivision.url);
  });
};
