import React from "react";
import { connect } from "react-redux";
import * as ActionTypes from "../ActionTypes";

class Multiple extends React.Component {
  constructor(props) {
    super(props);
    this.radioName = "mutli" + this.props.questionIndex;
  }
  handleAddOption() {
    this.props.questionsArray[this.props.questionIndex].optionsArray.push("");
  }
  handleOtherOption() {
    this.props.questionsArray[
      this.props.questionIndex
    ].isOthersOptionPresent = !this.props.questionsArray[
      this.props.questionIndex
    ].isOthersOptionPresent;
  }
  render() {
    return (
      <div className="multiple_choice">
        <input
          className="form-control"
          type="text"
          value={this.props.questionsArray[this.props.questionIndex].question}
          onChange={e => this.props.updateQuestion(e, this.props.questionIndex)}
          disabled={this.props.responseMode}
          placeholder="Question"
        />
        <div id="option">
          <div id="optionAdding">
            {this.props.questionsArray[
              this.props.questionIndex
            ].optionsArray.map((obj, index) => {
              return (
                <table style={{ marginTop: "0px" }} id="multiOption">
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <input
                            type="radio"
                            name={this.radioName}
                            value={obj}
                            onChange={e =>
                              this.props.updateSelectedAnswer(
                                e,
                                this.props.questionIndex
                              )
                            }
                            disabled={!this.props.responseMode}
                          />
                        </div>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          value={obj}
                          onChange={e =>
                            this.props.updateOption(
                              e,
                              this.props.questionIndex,
                              index
                            )
                          }
                          disabled={this.props.responseMode}
                          placeholder="Option(s)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </div>
          {this.props.questionsArray[this.props.questionIndex]
            .isOthersOptionPresent == true && (
            <table>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <input
                        type="radio"
                        name={this.radioName}
                        value="Others"
                        onChange={e =>
                          this.props.updateSelectedAnswer(
                            e,
                            this.props.questionIndex
                          )
                        }
                        disabled={!this.props.responseMode}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Others"
                      disabled={true}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {!this.props.responseMode && (
            <table>
              <tbody>
                <tr>
                  <td
                    onClick={() =>
                      this.props.addOption(this.props.questionIndex)
                    }
                  >
                    <span className="nav-link">Add option</span>
                  </td>
                  <td>
                    <span
                      className="nav-link"
                      onClick={() =>
                        this.props.toggleOthers(this.props.questionIndex)
                      }
                    >
                      Toggle "OTHERS"
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
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
    updateQuestion: (e, i) =>
      dispatch({
        type: ActionTypes.UPDATE_QUESTION,
        payload: e.target.value,
        index: i
      }),
    updateSelectedAnswer: (e, i) =>
      dispatch({
        type: ActionTypes.UPDATE_ANSWER,
        payload: e.target.value,
        index: i
      }),
    updateOption: (e, qi, oi) =>
      dispatch({
        type: ActionTypes.UPDATE_OPTION,
        payload: e.target.value,
        index: qi,
        oindex: oi
      }),
    addOption: qi => dispatch({ type: ActionTypes.ADD_OPTION, index: qi }),
    toggleOthers: qi => dispatch({ type: ActionTypes.TOGGLE_OTHERS, index: qi })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Multiple);
