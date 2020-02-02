var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
require("./models/FormDataModel");
var indexRouter = require("./routes/index");
const answerRouter = require("./routes/answerRouter");
const getFormDataRouter = require("./routes/getFormDataRouter");
const putFormDataRouter = require("./routes/putFormDataRouter");
const sendResponseRouter = require("./routes/sendResponseRouter");

var keys = require("./config/keys");

mongoose.connect(keys.mongoConnectionURI);
//const mongoose = require("./services/mongoose");
//const sgMail = require("./services/sendgrid");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));
// app.use(bodyParser.urlencoded({ extended: true })); ///for post using bodyparser
// app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", indexRouter);
app.get("/:formKey", answerRouter);
app.get("/api/getFormData/:formKey", getFormDataRouter);
app.post("/api/putFormData", putFormDataRouter);
app.post("/api/sendResponse", sendResponseRouter);

module.exports = app;
