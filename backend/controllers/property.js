const Property = require("../models/property");
const Owner = require("../models/owner");

exports.createProperty = (req, res, next) => {
  const property = new Property({
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    // houseCode: req.body.houseCode,
    apartmentSize: req.body.apartmentSize,
    propertyManger: req.body.propertyManger,
    managerPhoneNumber: req.body.managerPhoneNumber,
    houseCode: req.body.houseCode,
    bankAccountNumber: req.body.bankAccountNumber.toLocaleString("fullwide", {
      useGrouping: false,
    }),
    owner: req.userData.userId,
  });
  property.save().then((createdProperty) => {
    res.status(201).json({
      message: "Property added succesfully",
      propertyId: createdProperty._id,
    });
  });

  Owner.findById(req.userData.userId).then((owner) => {
    owner.properties.push(property);
    console.log(owner);
    owner.save();
  });
};

exports.getProperties = (req, res, next) => {
  Property.find().then((documents) => {
    res.status(200).json({
      message: "Property fetched success",
      properties: documents,
    });
  });
};

//ZAIMPLEMENTOWANE W KONTROLERZE OWNERA
// exports.getOwnerProperty = (req, res, next) => {
//   Owner.findOne({ _id: req.userData.userId })
//     .populate("properties")
//     .then((owner) => {
//       res.status(200).json({
//         message: "property fetched works",
//         properties: owner.properties,
//       });
//     });
// };

exports.deleteProperty = (req, res, next) => {
  Property.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Property Deleted!!" });
  });

  Owner.findById(req.userData.userId).then((owner) => {
    filtered = owner.properties.filter(
      (property) => property.toString() !== req.params.id
    );
    console.log(filtered);
    owner.properties = filtered;
    owner.save();
  });
};

exports.updateProperty = (req, res, next) => {
  const property = new Property({
    _id: req.body.id,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    // houseCode: req.body.houseCode,
    apartmentSize: req.body.apartmentSize,
    propertyManger: req.body.propertyManger,
    managerPhoneNumber: req.body.managerPhoneNumber,
    houseCode: req.body.houseCode,
    bankAccountNumber: req.body.bankAccountNumber.toLocaleString("fullwide", {
      useGrouping: false,
    }),
  });
  Property.updateOne({ _id: req.params.id }, property).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
};
