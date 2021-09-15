const Owner = require("../models/owner");
const User = require("../models/user");
const Agreement = require("../models/agreement");
var mongoose = require("mongoose");
const Obligation = require("../models/obligation");

exports.getOwnerProperties = (req, res, next) => {
  Owner.findOne({ _id: req.userData.userId })
    .populate("properties")
    .then((owner) => {
      res.status(200).json({
        message: "properties fetched works",
        properties: owner.properties,
      });
    });
};

exports.getOwnerData = (req, res, next) => {
  Owner.findOne({ _id: req.userData.userId }).then((owner) => {
    res.status(200).json({
      message: "OwnerData fetched works",
      ownerData: owner,
    });
  });
};

exports.getOwnerId = (req, res, next) => {
  console.log("Get Owner Works");
  const ownerId = req.userData.userId;
  res.status(200).json(ownerId);
};

exports.getOwnerObligations = (req, res, next) => {
  console.log("get owner obligations work backend");
  Obligation.find({ owner: req.userData.userId })
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

exports.changeCheckedStatus = (req, res, next) => {
  // console.log(req.body.isChecked);
  // console.log(req.params.obligationId);
  Obligation.updateOne(
    { _id: req.params.obligationId },
    { $set: { ifChecked: req.body.isChecked } }
  ).then((result) => {
    console.log(result);
    res
      .status(200)
      .json({ message: "IfChecked changed", updatedObligation: result });
  });
};

exports.getOwnerById = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.ownerById)) {
    Owner.findOne({ _id: req.params.ownerById }).then((result) => {
      console.log(result);
      res.status(200).json({ message: "ownerById fetched", user: result });
    });
  } else {
    next();
  }
};

exports.getUserToAgreement = (req, res, next) => {
  User.findOne({ email: req.params.email }).then((user) => {
    res.status(200).json({
      message: "User fetched works",
      user: user,
    });
  });
};

exports.checkUserInAgreement = (req, res, next) => {
  User.findOne({ email: req.params.email }).then((user) => {
    Agreement.findOne({ tenant: user._id }).then((userChecked) => {
      res.status(200).json({
        message: "User in agreements fetched - error",
        userChecked: userChecked,
      });
    });
  });
};

exports.updateOwner = (req, res, next) => {
  const owner = new Owner({
    _id: req.userData.userId,
    name: req.body.name,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    IDseries: req.body.IDseries,
    IDnumber: req.body.IDnumber,
    phoneNumber: req.body.phoneNumber,
  });
  console.log("update owner works");
  Owner.updateOne({ _id: req.userData.userId }, owner).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
};

// exports.ownerUpdate = (req, res, next) => {
//   const owner = new Owner({
//     name: req.body.name,
//     lastName: req.body.lastName,
//     address: req.body.address,
//     city: req.body.city,
//     IDseries: req.body.IDseries,
//     IDnumber: req.body.IDnumber,
//     phoneNumber: req.body.phoneNumber,
//   });
//   console.log("owner update works");
// };

exports.getOwnerAgreements = (req, res, next) => {
  Owner.findOne({ _id: req.userData.userId })
    // .populate("agreements")
    .populate({
      path: "agreements",
      populate: [
        {
          path: "property",
          model: "Property",
        },
        {
          path: "tenant",
          model: "User",
          populate: [
            {
              path: "notifications",
              model: "Notification",
            },
            {
              path: "meters",
              model: "Meter",
            },
          ],
        },
      ],
    })
    .then((owner) => {
      res.status(200).json({
        message: "agreements fetched works",
        agreements: owner.agreements,
        // properties: owner.agreements.property,
        // tenants: owner.agreements.tenant,
      });
    });
};
