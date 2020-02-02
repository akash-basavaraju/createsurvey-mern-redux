import React from "react";
import { connect } from "react-redux";
import * as ActionTypes from "../ActionTypes";

class Paragraph extends React.Component {
  render() {
    return (
      <div className="paragraph">
        <input
          className="form-control"
          type="text"
          value={this.props.questionsArray[this.props.questionIndex].question}
          onChange={e => this.props.updateQuestion(e, this.props.questionIndex)}
          disabled={this.props.responseMode}
          placeholder="Question"
        />
        <textarea
          className="form-control"
          type="text"
          placeholder="Paragraph"
          rows="3"
          value={this.props.questionsArray[this.props.questionIndex].answer}
          onChange={e => this.props.updateAnswer(e, this.props.questionIndex)}
          disabled={!this.props.responseMode}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    questionsArray: state.questionsArray,
    responseMode: state.responseMode
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateQuestion: (e, i) =>
      dispatch({
        type: ActionTypes.UPDATE_QUESTION,
        payload: e.target.value,
        index: i
      }),
    updateAnswer: (e, i) =>
      dispatch({
        type: ActionTypes.UPDATE_ANSWER,
        payload: e.target.value,
        index: i
      })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paragraph);
