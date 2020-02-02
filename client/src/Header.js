import React from "react";
import axios from "axios";
import Content from "./Content";
import { connect } from "react-redux";
import * as ActionTypes from "./ActionTypes";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.formId = window.location.pathname;
    this.formId = this.formId.substr(1);
    if (window.location.pathname == "/createForm") {
    } else {
      axios.get("/api/getFormData" + window.location.pathname).then(res => {
        console.log(res);
        this.props.updateStore(res.data.array.formData.appStore);
      });
      if (localStorage.getItem(this.formId) !== null) {
        alert("You have already filled this Form. Thank you!");
        window.location = "https://createsurvey.herokuapp.com";
      }
    }
  }
  handleFinalSave() {
    if (this.props.state.responseMode == true) {
      let validation = true;
      this.props.state.questionsArray.map(question => {
        if (question.answer === "") validation = false;
        if (question.questionType === "Checkboxes") {
          if (question.answersArray.length === 0) {
            validation = false;
          }
        }
      });
      if (validation === true) {
        axios
          .post("/api/sendResponse", { appStore: this.props.state })
          .then(res => {
            if (res.status == 200) {
              alert("Your response has been successfully send!");
              localStorage.setItem(this.formId, true);
            } else {
              alert("Your response could not be sent successfully!");
            }
            window.location = "https://createsurvey.herokuapp.com";
          });
      } else {
        alert("Please provide Answers to All the Questions!");
      }
    } else {
      let validation = true;
      if (this.props.state.formMetaData.formName !== "") {
        if (this.props.state.formMetaData.formDescription !== "") {
          this.props.state.questionsArray.map(question => {
            if (question.question === "") validation = false;
            if (
              question.questionType === "Checkboxes" ||
              question.questionType === "Multiple choice"
            ) {
              question.optionsArray.map(option => {
                if (option === "") validation = false;
              });
            }
          });
        } else {
          validation = false;
        }
      } else {
        validation = false;
      }
      if (validation === true) {
        var d = new Date();
        this.formKey =
          d.getTime().toString() +
          d.getDate().toString() +
          d.getMonth().toString() +
          d.getFullYear().toString();
        console.log(
          "Form has been saved successfully! Share this link with users : https://createsurvey.herokuapp.com/" +
            this.formKey
        );
        this.props.updateFormKey(this.formKey);
        this.props.state.formKey = this.formKey;
        var toEmailId = window.prompt(
          "Enter your email address to send the responses:"
        );
        this.props.state.toEmailId = toEmailId;
        this.props.state.responseMode = true;
        axios
          .post("/api/putFormData", { appStore: this.props.state })
          .then(res => {
            if (res.status == 200) {
              document.getElementById("showLinkModal").style.display = "block";
            } else
              alert("Form data could not be saved, please try again later!");
            //window.location="https://createsurvey.herokuapp.com";
          });
      } else {
        alert("Please Enter All Questions or Options Properly!");
      }
    }
  }
  render() {
    return (
      <div style={{ backgroundColor: "white" }}>
        <nav
          className="navbar navbar-dark"
          style={{ backgroundColor: "#4b42f4" }}
        >
          <a className="navbar-brand" href="#">
            <b>Survey Creator</b>
          </a>
          <form className="form-inline">
            {window.location.pathname == "/createForm" && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => {
                  this.props.addQuestion();
                  setTimeout(
                    function() {
                      window.scrollBy({
                        left: 0,
                        top: 500,
                        behavior: "smooth"
                      });
                    }.bind(this),
                    200
                  );
                }}
              >
                Add question
              </button>
            )}
            <button
              className="btn btn-success my-2 my-sm-0"
              type="button"
              onClick={() => this.handleFinalSave()}
            >
              Save and Send
            </button>
          </form>
        </nav>
        <div style={{ margin: "0.5rem" }}>
          <h3>
            Create form according to your requirement and send it to the user to
            receive the response!
          </h3>
        </div>
        <Content />
        <div className="modal" id="showLinkModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" style={{ maxWidth: "560px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Saved successfully!</h5>
              </div>
              <div className="modal-body">
                <p>
                  Form has been saved successfully! Share this link with users :
                </p>
                <p>
                  {"https://createsurvey.herokuapp.com/" +
                    this.props.state.formKey}
                </p>
                <br />
                <p>
                  <b>Note : </b>
                  Please check the responces in the spam folder of your Email
                  Provider as well!
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => {
                    window.location = "https://createsurvey.herokuapp.com";
                  }}
                >
                  Create new Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { state: state };
}
function mapDispatchToProps(dispatch) {
  return {
    addQuestion: () => dispatch({ type: ActionTypes.ADD_QUESTION }),
    updateStore: payload =>
      dispatch({ type: ActionTypes.UPDATE_STORE, payload: payload }),
    updateFormKey: key =>
      dispatch({ type: ActionTypes.UPDATE_FORM_KEY, payload: key })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
