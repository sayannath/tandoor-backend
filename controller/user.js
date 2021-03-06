const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.password = undefined; //Password
  req.profile.createdAt = undefined; //Created At
  req.profile.updatedAt = undefined; // Updated At
  return res.json(req.profile);
};

exports.getUsers = (req, res) => {
  User.find().exec((err, user) => {
    if (err) {
      res.status(400).json({
        error: "No USERS are found",
      });
    }
    res.json(user);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.password = undefined;
      res.json(user);
    }
  );
};