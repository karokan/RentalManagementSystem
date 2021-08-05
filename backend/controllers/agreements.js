const Agreement = require("../models/agreement");
const Owner = require("../models/owner");

exports.createAgreement = (req, res, next) => {
  const agreement = new Agreement({
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    rent: req.body.rent,
    deposit: req.body.deposit,
    media: req.body.media,
    owner: req.userData.userId,
    property: req.body.propertyId,
    tenant: req.body.tenantId,
  });

  agreement.save().then((createdAgreement) => {
    res.status(201).json({
      message: "Agreement added successfully",
      agreementId: createdAgreement._id,
    });
  });

  Owner.findById(req.userData.userId).then((owner) => {
    owner.agreements.push(agreement);
    owner.save();
  });
};

exports.deleteAgreement = (req, res, next) => {
  Agreement.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Agreement Deleted!" });
  });
  Owner.findById(req.userData.userId).then((owner) => {
    filtered = owner.agreements.filter(
      (agreement) => agreement.toString() !== req.params.id
    );
    console.log(filtered);
    owner.agreements = filtered;
    owner.save();
  });
};

exports.updateAgreement = (req, res, next) => {
  const agreement = new Agreement({
    _id: req.body.id,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    rent: req.body.rent,
    deposit: req.body.deposit,
    media: req.body.media,
    owner: req.userData.userId,
    property: req.body.propertyId,
    tenant: req.body.tenantId,
  });
  Agreement.updateOne({ _id: req.params.id }, agreement).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
};
