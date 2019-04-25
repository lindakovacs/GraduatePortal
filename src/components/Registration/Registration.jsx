import React, { useState, useEffect } from "react";
import { FormGroup, FormControl, Button, InputGroup } from "react-bootstrap";
import ErrorMessage from "../Widgets/ErrorMessage";
import "./Registration.css";

function Registration(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [showconfirmedpassword, setShowconfirmedpassword] = useState(false);
  const [confirmedpassword, setConfirmedpassword] = useState("");
  const [passworderror, setPassworderror] = useState("");
  const [linkvalidity, setLinkvalidity] = useState(true);
  const [invalidregistrationlink, setInvalidregistrationlink] = useState(false);

  const registrationhash = props.match.params.hash;

  const passwordvalidation = () => {
    setPassworderror("");
    let regexp = /([!@#$%^&*(),.?":{}|<>])+([0-9])+([A-Z])+([a-z])+/g;
    if (
      regexp.test(
        password
          .split("")
          .sort()
          .join("")
      )
    ) {
      if (password.length >= 6) {
        if (password === confirmedpassword) {
          return true;
        } else {
          setPassworderror("Passwords don't match");
        }
      } else {
        setPassworderror("password must be at least 6 characters");
      }
    } else {
      setPassworderror("Password doesn't meet requirements");
    }
  };

  const newuserlinkhashgenerator = () => {
    let hash = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let charactersLength = characters.length;
    for (let i = 0; i < 32; i++) {
      hash += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let timestamp = Date.now();
    hash += timestamp;
    return hash;
  };

  const registrationlinkcheck = () => {
    if (isNaN(parseInt(registrationhash.slice(32)))) {
      setInvalidregistrationlink(true);
    } else if (Date.now() - parseInt(registrationhash.slice(32)) > 604800000) {
      setLinkvalidity(false);
    }
  };

  useEffect(() => {
    registrationlinkcheck();
  }, []);

  console.log("hash from url:", registrationhash);
  console.log("generated hash:", newuserlinkhashgenerator());

  return (
    <div className="login container text-center">
      {invalidregistrationlink ? (
        <ErrorMessage>
          <h1>Registration Link Invalid</h1>
        </ErrorMessage>
      ) : linkvalidity ? (
        <form className="panel" onSubmit={e => e.preventDefault()}>
          <header className="panel-body">
            <h2>New User Registration</h2>
          </header>
          <main className="panel-body">
            <FormGroup controlId="user-email">
              <FormControl
                type="email"
                placeholder="Email"
                aria-label="Email"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password">
              <InputGroup>
                <FormControl
                  type={showpassword ? "text" : "password"}
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setPassworderror("");
                  }}
                />
                <InputGroup.Addon>
                  <input
                    type="checkbox"
                    aria-label="Show"
                    className="login-input"
                    onClick={() => setShowpassword(!showpassword)}
                  />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <FormGroup controlId="password-confirmation">
              <InputGroup>
                <FormControl
                  type={showconfirmedpassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  aria-label="Password"
                  value={confirmedpassword}
                  onChange={e => setConfirmedpassword(e.target.value)}
                />
                <InputGroup.Addon>
                  <input
                    type="checkbox"
                    aria-label="Show"
                    className="login-input"
                    onClick={() =>
                      setShowconfirmedpassword(!showconfirmedpassword)
                    }
                  />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <div className="text-left">
              <p>
                <b>Password Requirements:</b>
              </p>
              <ul>
                <li>Minimum 6 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
              </ul>
            </div>
            {passworderror && <ErrorMessage>{passworderror}</ErrorMessage>}
            <Button
              type="submit"
              className="btn acc-btn acc-btn-primary login-btn"
              onClick={() => passwordvalidation()}
              disabled={props.isLoading === true}
            >
              {props.isLoading ? "LOADING ..." : "SIGN UP"}
            </Button>
            {props.isLoginInvalid && (
              <ErrorMessage errorData="login-error">
                Your email does not match what we have in our records.
              </ErrorMessage>
            )}
            {props.hasError && (
              <ErrorMessage errorData="login-error">
                Sorry! The Graduate Portal is temporarily down. Our engineers
                are aware of the problem and are hard at work trying to fix it.
                Please come back later.
              </ErrorMessage>
            )}
          </main>
        </form>
      ) : (
        <ErrorMessage>
          <h1>Registration Link Expired</h1>
        </ErrorMessage>
      )}
    </div>
  );
}

export default Registration;
