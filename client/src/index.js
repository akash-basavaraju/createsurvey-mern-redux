import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./Header";
import Reducer from "./Reducer";
import Introduction from "./Introduction";
import "./index.css";

const store = createStore(
  Reducer,
  {
    formKey: "",
    toEmailId: "",
    responseMode: false,
    formMetaData: {
      formName: "",
      formDescription: ""
    },
    questionsArray: [
      {
        questionType: "Short answer",
        question: "",
        isRequired: false,
        answer: ""
      }
    ]
  },
  applyMiddleware(ReduxThunk)
);

class GoogleForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div style={{ minWidth: "100%", minHeight: "100%", padding: "0rem" }}>
          <Switch>
            <Route exact path="/" component={Introduction} />
            <Route path="*" component={Header} />
            </Switch>
          </div>
        </Provider>
      </Router>
    );
  }
}

ReactDOM.render(<GoogleForm />, document.getElementById("root"));
