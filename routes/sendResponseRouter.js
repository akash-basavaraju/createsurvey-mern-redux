const express = require("express");
//const router = express.Router();
const sgMail = require("../services/sendgrid");

var toEmailTemplate = function(jsonObject) {
  var tempString = "";
  var startTag = "<tr><td>";
  var middleTag = "</td><td>";
  var endTag = "</td></tr>";
  var formName = jsonObject.formMetaData.formName;
  var formDescription = jsonObject.formMetaData.formDescription;
  jsonObject.questionsArray.map(sQuestion => {
    if (sQuestion.answer) {
      tempString +=
        startTag + sQuestion.question + middleTag + sQuestion.answer + endTag;
    } else {
      let answersArrayTemp = "User chosen Answer(s) : <ul><li>";
      let middleList = "</li><li>";
      let endList = "</li></ul>";
      let answersLength = sQuestion.answersArray.length - 1;
      sQuestion.answersArray.map((answer, index) => {
        if (index == answersLength) answersArrayTemp += answer;
        else answersArrayTemp += answer + middleList;
      });
      answersArrayTemp += endList;
      tempString +=
        startTag + sQuestion.question + middleTag + answersArrayTemp + endTag;
    }
  });
  return (
    "<html>" +
    "  <head>" +
    "    <style>" +
    "table {" +
    "    font-family: arial, sans-serif;" +
    "    border-collapse: collapse;" +
    "    width: 100%;" +
    "}" +
    "" +
    "td, th {" +
    "    border: 1px solid #dddddd;" +
    "    text-align: left;" +
    "    padding: 8px;" +
    "}" +
    "" +
    "tr:nth-child(even) {" +
    "    background-color: #dddddd;" +
    "}" +
    "</style>" +
    "  </head>" +
    "  <body>" +
    "  <h2>Survey Creator</h2>" +
    "  <p>One of the user filled your Form!</p>" +
    "<h3>Form Name : " +
    formName +
    "</h3>" +
    "<h4>Form Description : " +
    formDescription +
    "</h4>" +
    "  <table>" +
    "    <thead>" +
    "      <tr>" +
    "        <th>Quesiton(s)</th>" +
    "        <th>Answer(s)</th>" +
    "      </tr>" +
    "    </thead>" +
    "    <tbody>" +
    tempString +
    "    </tbody>" +
    "  </table>" +
    "  </body>" +
    "</html>"
  );
};

router = (req, res) => {
  const msg = {
    to: req.body.appStore.toEmailId.toString(),
    from: "noreply@asoft.com",
    subject: "[Attention] New Response for your Survey",
    text: "[Attention] New Response for your Survey",
    html: toEmailTemplate(req.body.appStore)
  };

  sgMail.send(msg);
  res.status = 200;
  res.send({ status: 200 });
};

module.exports = router;
