const Meter = require("../models/meter");
const User = require("../models/user");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "/uploads/" });

exports.createMeter = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const meter = new Meter({
    content: req.body.content,
    meter: req.body.meter,
    creator: req.userData.userId,
    meterImage: url + "/images/" + req.file.filename,
  });

  // meter = [];
  meter.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: "Meter's Photo added successfully",
      meter: result,
    });
  });

  User.findById(req.userData.userId).then((user) => {
    user.meters.push(meter);
    // user.meters = [];
    user.save();
  });
};

exports.getMeter = (req, res, next) => {};
