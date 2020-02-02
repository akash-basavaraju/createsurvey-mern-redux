const express = require("express");
//const router = express.Router();
const mongoose = require("mongoose");
const FormDataModel = mongoose.model("FormDataModel");

router = (req, res) => {
  FormDataModel.findOne({ formKey: req.params.formKey }, (err, docs) => {
    res.send({ array: docs });
  });
};

module.exports = router;
