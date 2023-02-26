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
exports.subdivision_create_post = [
  //Sanitizes name and description field, then creates a new Subdivision and if there's no errors saves it and redirects user
  body("name", "Subdivision name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must be a string")
    .optional({ checkFalsy: true })
    .isString()
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    const subdivision = new Subdivision({
      name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      subdivision.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(subdivision.url);
      });
    }
  },
];

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
exports.subdivision_update_get = function (req, res, next) {
  Subdivision.findById(req.params.id, function (err, subdivision_details) {
    if (err) {
      return next(err);
    }
    //Successful, so send response as JSON
    res.json(subdivision_details);
  });
};
exports.subdivision_update_post = [
  // Validate and sanitize input fields
  body("name", "Subdivision name required")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    // Extract the validation errors from the request
    const errors = validationResult(req);

    // Create a new Subdivision object with the sanitized data and ID
    const subdivision = new Subdivision({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });

    // If there are errors, re-render the form with the sanitized data and error messages
    if (!errors.isEmpty()) {
      res.json(errors);
    }

    // If there are no errors, update the Subdivision object in the database and redirect to its detail page
    Subdivision.findByIdAndUpdate(
      req.params.id,
      subdivision,
      {},
      (err, thesubdivision) => {
        if (err) {
          return next(err);
        }
        //Successful, so redirect
        res.redirect(thesubdivision.url);
      }
    );
  },
];
