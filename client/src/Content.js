import React from "react";
import { connect } from "react-redux";
import Question from "./Question";
import * as ActionTypes from "./ActionTypes";

class Content extends React.Component {
  render() {
    return (
      <div style={{ padding: "1rem" }}>
        <div>
          <input
            type="text"
            className="form-control"
            value={this.props.formMetaData.formName}
            onChange={e => this.props.updateFormName(e)}
            disabled={this.props.responseMode}
            placeholder="Form Name Here.."
          />
          <input
            type="text"
            className="form-control"
            value={this.props.formMetaData.formDescription}
            onChange={e => this.props.updateFormDesc(e)}
            disabled={this.props.responseMode}
            placeholder="Form Description Here.."
          />
        </div>

        {this.props.questionsArray.map((obj, index) => {
          return (
            <div>
              <div>
                <span
                  style={{
                    fontSize: "1.2rem",
                    padding: "0.5rem"
                  }}
                >
                  Q. {index + 1}
                </span>
              </div>
              <Question questionIndex={index} />
            </div>
          );
        })}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    formMetaData: state.formMetaData,
    responseMode: state.responseMode,
    questionsArray: state.questionsArray
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateFormName: e =>
      dispatch({
        type: ActionTypes.UPDATE_FORM_NAME,
        payload: e.target.value
      }),
    updateFormDesc: e =>
      dispatch({
        type: ActionTypes.UPDATE_FORM_DESC,
        payload: e.target.value
      })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
