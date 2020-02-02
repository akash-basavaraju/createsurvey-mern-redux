import React from "react";
import { connect } from "react-redux";
import Short from "./QuestionTypes/Short";
import Paragraph from "./QuestionTypes/Paragraph";
import Multiple from "./QuestionTypes/Multiple";
import Checkboxes from "./QuestionTypes/Checkboxes";
import * as ActionTypes from "./ActionTypes";

class Question extends React.Component {
  chooseQuestionType() {
    switch (this.props.questionsArray[this.props.questionIndex].questionType) {
      case "Short answer":
        return <Short questionIndex={this.props.questionIndex} />;
        break;
      case "Paragraph":
        return <Paragraph questionIndex={this.props.questionIndex} />;
        break;
      case "Multiple choice":
        return <Multiple questionIndex={this.props.questionIndex} />;
        break;
      case "Checkboxes":
        return <Checkboxes questionIndex={this.props.questionIndex} />;
        break;
    }
  }
  handleChangeQuestionType(e) {
    let updatedObj;
    switch (e.target.value) {
      case "Short answer":
        updatedObj = {
          questionType: "Short answer",
          question: "",
          isRequired: false,
          answer: ""
        };
        break;
      case "Paragraph":
        updatedObj = {
          questionType: "Paragraph",
          question: "",
          isRequired: false,
          answer: ""
        };
        break;
      case "Multiple choice":
        updatedObj = {
          questionType: "Multiple choice",
          question: "",
          isRequired: false,
          optionsArray: [""],
          isOthersOptionPresent: false,
          answer: ""
        };
        break;
      case "Checkboxes":
        updatedObj = {
          questionType: "Checkboxes",
          question: "",
          isRequired: false,
          optionsArray: [""],
          isOthersOptionPresent: false,
          answersArray: []
        };
        break;
    }
    this.props.questionsArray.splice(this.props.questionIndex, 1, updatedObj);
  }
  handleCloneClick() {
    let updatedObj;
    switch (this.props.questionsArray[this.props.questionIndex].questionType) {
      case "Short answer":
        updatedObj = {
          questionType: "Short answer",
          question: "",
          isRequired: false,
          answer: ""
        };
        break;
      case "Paragraph":
        updatedObj = {
          questionType: "Paragraph",
          question: "",
          isRequired: false,
          answer: ""
        };
        break;
      case "Multiple choice":
        updatedObj = {
          questionType: "Multiple choice",
          question: "",
          isRequired: false,
          optionsArray: [""],
          isOthersOptionPresent: false,
          answer: ""
        };
        break;
      case "Checkboxes":
        updatedObj = {
          questionType: "Checkboxes",
          question: "",
          isRequired: false,
          optionsArray: [""],
          isOthersOptionPresent: false,
          answersArray: []
        };
        break;
      case "Dropdown":
        updatedObj = {
          questionType: "Dropdown",
          question: "",
          isRequired: false,
          optionsArray: [""],
          isOthersOptionPresent: false,
          answer: ""
        };
        break;
    }
    this.props.questionsArray.splice(
      this.props.questionIndex + 1,
      0,
      updatedObj
    );
    setTimeout(
      () => window.scrollBy({ left: 0, top: 500, behavior: "smooth" }),
      200
    );
  }
  handleRemoveClick() {
    window.scrollBy({ left: 0, top: -400, behavior: "smooth" });
    setTimeout(
      () => this.props.questionsArray.splice(this.props.questionIndex, 1),
      500
    );
  }
  render() {
    return (
      <div className="card">
        <div className="card-title">
          <span>Choose the Question Type : </span>
          <select
            className="custom-select"
            onChange={e =>
              this.props.changeQuestionType(e, this.props.questionIndex)
            }
            value={
              this.props.questionsArray[this.props.questionIndex].questionType
            }
            disabled={this.props.responseMode}
            style={{ width: "10rem" }}
          >
            <option value="Short answer">Short answer</option>
            <option value="Paragraph">Paragraph</option>
            <option value="Multiple choice">Multiple choice</option>
            <option value="Checkboxes">Checkboxes</option>
          </select>
        </div>
        <div className="card-body">{this.chooseQuestionType()}</div>
        {!this.props.responseMode && (
          <div className="card-footer">
            <button
              className="btn btn-primary"
              onClick={() => {
                this.props.cloneThisQuestion(
                  this.props.questionIndex,
                  this.props.questionsArray[this.props.questionIndex]
                    .questionType
                );
                setTimeout(
                  () =>
                    window.scrollBy({ left: 0, top: 500, behavior: "smooth" }),
                  200
                );
              }}
            >
              <span className="msg_duplicate">Duplicate</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                window.scrollBy({ left: 0, top: -400, behavior: "smooth" });
                setTimeout(
                  () => this.props.removeThisQuestion(this.props.questionIndex),
                  500
                );
              }}
            >
              <span className="msg_remove">Remove</span>
            </button>

            {/* <input
                            type="checkbox"
                            name={this.radioName}
                            value={
                                this.props.questionsArray[
                                    this.props.questionIndex
                                ].isRequired
                            }
                            onChange={e =>
                                (this.props.questionsArray[
                                    this.props.questionIndex
                                ].isRequired = e.target.checked)
                            }
                            value={
                                this.props.questionsArray[
                                    this.props.questionIndex
                                ].isRequired
                            }
                        />

                        <label>Mandatory question</label> */}
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    responseMode: state.responseMode,
    questionsArray: state.questionsArray
  };
}
function mapDispatchToProps(dispatch) {
  return {
    changeQuestionType: (e, i) =>
      dispatch({
        type: ActionTypes.CHANGE_QUESTION_TYPE,
        payload: e.target.value,
        index: i
      }),
    cloneThisQuestion: (i, qt) =>
      dispatch({
        type: ActionTypes.CLONE_QUESTION,
        index: i,
        questionType: qt
      }),
    removeThisQuestion: i =>
      dispatch({ type: ActionTypes.REMOVE_QUESTION, index: i })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
