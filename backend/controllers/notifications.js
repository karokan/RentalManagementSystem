const Notification = require("../models/notification");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.createNotification = (req, res, next) => {
  const notification = new Notification({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId,
  });
  notification.save().then((createdNotification) => {
    res.status(201).json({
      message: "Notification Added succesfully",
      //id potrzebne przy usuwaniu notyfikacji
      notificationId: createdNotification._id,
    });
  });
  User.findById(req.userData.userId).then((user) => {
    user.notifications.push(notification);
    console.log(user);
    user.save();
    // res.status(201).json();
  });
};

exports.getNotification = (req, res, next) => {
  Notification.find().then((documents) => {
    // console.log(documents);
    res.status(200).json({
      message: "Notification fetched sucess",
      notifications: documents,
    });
  });
};

exports.deleteNotification = (req, res, next) => {
  Notification.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Notification Deleted!!" });
  });

  User.findById(req.userData.userId).then((user) => {
    filtered = user.notifications.filter(
      (notification) => notification.toString() !== req.params.id
    );
    console.log(filtered);
    user.notifications = filtered;
    user.save();

    // const filtered = user.notifications.filter((notification) => {
    //   console.log(notification);
    //   console.log(req.params.id);
    //   notification !== req.params.id;
    // });
    // console.log(filtered);
    // user.notifications = filtered;
    // user.save();
  });
};
