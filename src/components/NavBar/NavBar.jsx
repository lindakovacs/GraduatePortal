import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import accLogo from "../../images/albany-can-code-logo-white.png";
import "./NavBar.css";
import NewUsers from "../CreateNewUsers/NewUsers";

class NavBar extends Component {
  state = {
    toggleNewUser: false
  };

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect className="acc-navbar">
          <Navbar.Header
            className={`acc-header ${this.props.isAdmin ? "" : "non-admin"}`}
          >
            <Navbar.Brand className="acc-brand">
              <a href="https://albanycancode.org/">
                <img src={accLogo} alt={"acc logo"} />
              </a>
            </Navbar.Brand>
            {/* Toggle button for mobile isn't necessary for non-admins */}
            {this.props.isAdmin || (this.props.isGrad && <Navbar.Toggle />)}
          </Navbar.Header>

          {/* Show extra features for admins & Grads */}
          {this.props.isAdmin || this.props.isGrad ? (
            <Navbar.Collapse>
              {this.state.toggleNewUser && this.props.isAdmin && <NewUsers />}
              <Nav pullRight>
                <LinkContainer exact to="/" className="acc-link">
                  <NavItem eventKey={1}>SEARCH</NavItem>
                </LinkContainer>

                {this.props.isAdmin && (
                  <NavItem
                    className="new-user"
                    eventKey={3}
                    onClick={() =>
                      this.setState({
                        toggleNewUser: !this.state.toggleNewUser
                      })
                    }
                  >
                    ADD USERS
                  </NavItem>
                )}

                <NavItem
                  className="acc-link"
                  href="#"
                  eventKey={2}
                  onClick={this.props.logout}
                >
                  LOGOUT
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          ) : (
            // Show less features for non-admins.
            <Nav pullRight>
              <LinkContainer exact to="/" className="acc-link nav-search-word">
                <NavItem eventKey={1}>SEARCH</NavItem>
              </LinkContainer>
              <LinkContainer exact to="/" className="acc-link nav-search-icon">
                <NavItem eventKey={1}>
                  <i className="fa fa-search" />
                </NavItem>
              </LinkContainer>
            </Nav>
          )}
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
