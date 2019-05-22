import React, { Component } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../Widgets/ErrorMessage";
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      hasError: false,
      messageFromServer: "",
      showNullError: false,
      isEmailInvalid: false
    };
  }

  handleChange = name => event => {
    console.log("test");
    this.setState({
      [name]: event.target.value
    });
  };

  sendEmail = e => {
    e.preventDefault();
    const { email } = this.state;
    this.props.forgotPassword(email);
  };

  render() {
    const { email, messageFromServer, showNullError, hasError } = this.state;

    return (
      <div className="login container text-center">
        <form className="profile-form" onSubmit={this.sendEmail}>
          <header className="panel-body">
            <h2>Forgot Password</h2>
          </header>
          <main className="panel-body">
          <FormGroup validationState={this.props.validationState} >
              <FormControl
                type="email"
                placeholder="Email Address"
                aria-label="Email"
                id="email"
                label="email"
                value={email}
                onChange={this.handleChange("email")}
              />
            </FormGroup>

            <Button
              type="submit"
              className="btn acc-btn acc-btn-primary login-btn"
              // onClick={() => this.sendEmail()}
              disabled={this.isLoading === true}
            >
              {this.isLoading ? "LOADING ..." : "FORGOT PASSWORD"}
            </Button>
          </main>
        </form>

        {showNullError && (
              <div>
                <p>The email address cannot be null.</p>
              </div>
            )}
            {hasError && (
                <ErrorMessage errorData="login-error">
                  That email address isn&apos;t correct. Please contact the
                  administrator.
                </ErrorMessage>
            )}
            {messageFromServer === "recovery email sent" && (
              <div>
                <h3>Password Reset Email Successfully Sent!</h3>
              </div>
            )}

          {/* {this.props.isEmailInvalid && (
              <ErrorMessage errorData="login-error">
                That email address isn&apos;t correct. Please contact the
                  administrator.
              </ErrorMessage>
            )}
            {this.props.hasError && (
              <ErrorMessage errorData="login-error">
                Sorry! The Graduate Portal is temporarily down. Our engineers
                are aware of the problem and are hard at work trying to fix it.
                Please come back later.
              </ErrorMessage>
            )} */}
            <br/>
            <Link to="/">Home</Link><br/>
            <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default ForgotPassword;
