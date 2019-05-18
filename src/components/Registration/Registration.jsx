import React, { useState } from "react";
import { FormGroup, FormControl, Button, InputGroup } from "react-bootstrap";
import ErrorMessage from "../Widgets/ErrorMessage";
import "./Registration.css";

function Registration(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);

  return (
    <div className="login container text-center">
      {
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
                  placeholder="Temporary Password"
                  aria-label="Temporary Password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
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
            <Button
              type="submit"
              className="btn acc-btn acc-btn-primary login-btn"
              onClick={async () =>
                await props.registernewUser(username, password).then(() => {
                  if (props.isLoading === false && props.hasError === false) {
                    props.history.push("/profile/add");
                  }
                })
              }
              disabled={props.isLoading === true}
            >
              {props.isLoading ? "LOADING ..." : "SIGN UP"}
            </Button>
            {props.hasError && (
              <ErrorMessage errorData="login-error">
                {props.errorMessage}
              </ErrorMessage>
            )}
          </main>
        </form>
      }
    </div>
  );
}

export default Registration;
