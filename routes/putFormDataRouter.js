const express = require("express");
//const router = express.Router();
const mongoose = require("mongoose");
const FormDataModel = mongoose.model("FormDataModel");

router = (req, res) => {
  new FormDataModel({
    formKey: req.body.appStore.formKey,
    formData: req.body
  }).save(err => {
    if (err) console.log("Error inside the mongoose connectinon:" + err);
  });
  res.status = 200;
  res.send();
};

module.exports = router;
