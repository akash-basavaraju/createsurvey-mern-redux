import React from "react";

export default class Introduction extends React.Component {
  handleClick() {
    window.location = "https://createsurvey.herokuapp.com/createForm";
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{
          backgroundColor: "#4b42f4",
          color: "white",
          textAlign: "center",
          overflow: "auto"
        }}
      >
        <h1
          className="display-4"
          style={{ marginTop: "1rem", marginBottom: "2rem" }}
        >
          Welcome to Survey Creator!
        </h1>
        <hr />
        <div className="jumbotron" style={{ color: "black" }}>
          <div className="">
            <h3 style={{ fontWeight: "lighter" }}>
              Here you can create a form according to your requirement and send
              it to the users as URLs to receive the response in your Inbox!
            </h3>
            <div
              style={{
                textAlign: "left",
                display: "inline-block",
                fontWeight: "lighter",
                fontSize: "1.5rem"
              }}
            >
              <p>You can add many type of questions, like :</p>
              <ul>
                <li>Short Questions</li>
                <li>Paragraph Questions</li>
                <li>Multiple Choice Questions</li>
                <li>Checkbox Type Questions</li>
              </ul>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-success btn-lg"
                onClick={() => this.handleClick()}
                style={{ display: "inline-block" }}
              >
                Create Form
              </button>
            </div>
          </div>
          <div className="" style={{ textAlign: "center" }} />
        </div>
      </div>
    );
  }
}
