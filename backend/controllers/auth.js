const User = require("../models/user");
const Owner = require("../models/owner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const e = require("cors");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    if (req.body.role == "tenant") {
      const user = new User({
        email: req.body.email,
        role: req.body.role,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User created!",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    } else if (req.body.role == "owner") {
      const owner = new Owner({
        email: req.body.email,
        role: req.body.role,
        password: hash,
      });
      owner
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User created!",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "This is the secret key",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token: token,
        role: fetchedUser.role,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
};

// /////////// //////// DODATKOWE LOGOWANIE DLA WŁAŚCIELA /////// //////// //////// ////////

exports.ownerLogin = (req, res, next) => {
  console.log("from Owner");
  let fetchedOwner;
  Owner.findOne({ email: req.body.email })
    .then((owner) => {
      if (!owner) {
        console.log("nieznaleziono w ownerze");
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedOwner = owner;
      return bcrypt.compare(req.body.password, owner.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedOwner.email, userId: fetchedOwner._id },
        "This is the secret key",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token: token,
        role: fetchedOwner.role,
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
};
