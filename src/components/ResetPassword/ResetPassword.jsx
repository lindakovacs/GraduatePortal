import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FormGroup, FormControl, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

// import ForgotPasswordContainer from "./ForgotPassword/ForgotPasswordContainer";
// import SearchContainer from "./Search/SearchContainer";
// import LoginContainer from "./Login/LoginContainer";
import "./ResetPassword.css";

const loading = {
  margin: '1em',
  fontSize: '24px',
};

export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      updated: false,
      isLoading: true,
      error: false
    };
  }

  async componentDidMount() {
    await axios
      .get('http://graduateportal-dev.tw7ahpynm7.us-east-2.elasticbeanstalk.com/api/user/reset-password', {
        params: {
          resetPasswordToken: this.props.match.params.token
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.message === 'password reset link a-ok') {
          this.setState({
            email: response.data.email,
            updated: false,
            isLoading: false,
            error: false,
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        this.setState({
          updated: false,
          isLoading: false,
          error: true,
        });
      });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = (e) => {
    e.preventDefault();
    localStorage.setItem("token");
    axios
      .put('http://graduateportal-dev.tw7ahpynm7.us-east-2.elasticbeanstalk.com/api/user/updatePasswordViaEmail', {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        resetPasswordToken: this.props.match.params.token,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === 'password updated') {
          this.setState({
            updated: true,
            error: false,
          });
        } else {
          this.setState({
            updated: false,
            error: true,
          });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    const {
password, confirmPassword, error, isLoading, updated
} = this.state;

    if (error) {
      return (
        <div>
          <header className="panel-body">
            <h2>Reset Password</h2>
          </header>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <Link to="/">Go Home</Link>
            {/* <Link to="/" buttonText="Go Home" component={SearchContainer} > Go Home </Link> */}
            {/* <Link to="/forgotPassword" buttonText="Forgot Password" component={ForgotPasswordContainer} /> */}
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <header className="panel-body">
            <h2>Reset Password</h2>
          </header>
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div className="login container text-center">
        <form className="password-form" onSubmit={this.updatePassword}>
        <header className="panel-body">
            <h2>Reset Password</h2>
          </header>
          <main className="panel-body">
        <FormGroup>
        {/* <FormGroup controlId="reset-password"> */}
        <FormControl
                type="password"
                id="password"
                className="login-input"
                placeholder="Password"
                aria-label="Password"
                value={password}
                onChange={this.handleChange('password')}
              />

            <FormControl
                type="password"
                id="confirmPassword"
                className="login-input"
                placeholder="Confirm Password"
                aria-label="Password"
                value={confirmPassword}
                onChange={this.handleChange('confirmPassword')}
              />
            </FormGroup>

            <Button
              type="submit"
              className="btn acc-btn acc-btn-primary login-btn"
              placeholder="Update Password"
              onClick={() => this.sendEmail()}
              disabled={this.isLoading === true}
            >
              {this.isLoading ? "LOADING ..." : "RESET PASSWORD"}
            </Button>

        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            {/* <Link to="/login" buttonText="Login" component={LoginContainer} /> */}
            <Link to="/">Go Home</Link>
          </div>
        )}
        {/* <Link to="/" buttonText="Go Home" component={SearchContainer} /> */}
        <Redirect to="/" />
        </main>
        </form>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};