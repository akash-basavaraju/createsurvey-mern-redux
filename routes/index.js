var express = require("express");
const path = require("path");
//var router = express.Router();

/* GET home page. */
router = function(req, res) {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
};

module.exports = router;
