const User = require("../models/user");
const Agreement = require("../models/agreement");
const Obligation = require("../models/obligation");
var mongoose = require("mongoose");

exports.getUserData = (req, res, next) => {
  User.findOne({ _id: req.userData.userId }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "User fetched", user: result });
  });
  // console.log(req.userData.userId);
  // console.log("User info backend");
};

exports.getUserId = (req, res, next) => {
  const userId = req.userData.userId;
  res.status(200).json(userId);
  next();
};

exports.getUserById = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userById)) {
    User.findOne({ _id: req.params.userById }).then((result) => {
      console.log(result);
      res.status(200).json({ message: "UserById fetched", user: result });
    });
  } else {
    return;
  }
};

// exports.getUserData = (req, res, next) => {
//   User.findOne({ _id: req.userData.userId }).then((tenant) => {
//     res.status(200).json({
//       message: "UserData fetched works",
//       userData: user,
//     });
//   });
// };

exports.updateUser = (req, res, next) => {
  const user = new User({
    _id: req.userData.userId,
    name: req.body.name,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    IDseries: req.body.IDseries,
    IDnumber: req.body.IDnumber,
    phoneNumber: req.body.phoneNumber,
  });
  console.log("update user works");

  User.updateOne({ _id: req.userData.userId }, user).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
};

exports.getUserNotifications = (req, res, next) => {
  User.findOne({ _id: req.userData.userId })
    .populate("notifications")
    .then((user) => {
      // console.log("cała kolekcja usera", user.notifications);
      //console.log("user's notifications", user.notifications);
      // console.log("text from user's controller");
      res.status(200).json({
        message: "notification fetched works",
        notifications: user.notifications,
      });
    });
};

exports.getUserMeters = (req, res, next) => {
  User.findOne({ _id: req.userData.userId })
    .populate("meters")
    .then((user) => {
      res.status(200).json({
        message: "meter fetched works",
        meters: user.meters,
      });
    });
};

exports.getUserObligations = (req, res, next) => {
  console.log("get user obligations work backend");
  Obligation.find({ tenant: req.userData.userId })
    .populate([
      {
        path: "owner",
        ref: "Owner",
      },
      {
        path: "agreement",
        ref: "Agreement",
      },
      {
        path: "tenant",
        ref: "Tenant",
      },
    ])
    .then((obligation) => {
      console.log(obligation);
      res.status(200).json({
        message: "obligations fetched works",
        obligations: obligation,
      });
    });
};

exports.getUserAgreement = (req, res, next) => {
  Agreement.findOne({ tenant: req.userData.userId })
    .populate({
      path: "property",
      populate: {
        path: "owner",
        model: "Owner",
      },
    })
    .then((agreement) => {
      res.status(200).json({
        message: "agreement fetched works",
        agreement: agreement,
      });
    });
};
