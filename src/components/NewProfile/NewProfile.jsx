import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  HelpBlock,
  Button,
  ControlLabel
} from "react-bootstrap";
import ErrorMessage from "../Widgets/ErrorMessage";
import ModalWidget from "../Widgets/Modal";
import noPic from "../../images/no-profile.svg";
import resumeIcon from "../../images/resume-icon.svg";
import "./NewProfile.css";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id} bsClass="form-group grad-form-group">
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class NewProfile extends Component {
  state = {
    isNew: true,
    isAdmin: true,
    // added isGrad field
    isGrad: false,
    hasError: false,
    isActive: true,
    profileData: {
      firstName: "",
      lastName: "",
      yearOfGrad: "",
      skills: "",
      story: "",
      phone: "",
      // added password to state
      password: "",
      // added confirmPassword
      confirmPassword: "",
      // added passWordError
      passwordError: "",
      email: "",
      linkedin: "",
      github: "",
      website: "",
      image: "",
      resume: "",
      isActive: true
    },
    firstNameValid: null,
    lastNameValid: null,
    yearOfGradValid: null,
    emailValid: null,
    submitForm: false,
    passwordValid: null,
    confirmPasswordValid: null
  };

  onChangeInput = e => {
    this.setState({
      profileData: {
        ...this.state.profileData,
        [e.target.name]: e.target.value ? e.target.value : ""
      }
    });
  };

  // Setting Password with regexp
  handleNewProfile = e => {
    e.preventDefault();
    const { password, confirmPassword } = this.state.profileData;
    let regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,99}$/;
    if (password.match(regexp)) {
      if (password === confirmPassword) {
        return true;
      } else {
        this.setState({ passwordError: "Passwords don't match" });
      }
    } else {
      this.setState({ passwordError: "Password doesn't meet requirements" });
    }

    // check for validation on required fields
    const requiredArray = [
      ["firstName", "firstNameValid"],
      ["lastName", "lastNameValid"],
      ["yearOfGrad", "yearOfGradValid"],
      ["email", "emailValid"],
      // added password Validation
      ["password", "passwordValid"],
      // confirm password valiudation
      ["confirmPassword", "confirmPasswordValid"]
    ];
    for (let key of requiredArray) {
      if (!this.state.profileData[key[0]]) {
        this.setState({ [key[1]]: "error" });
      } else {
        this.setState({ [key[1]]: null });
      }
    }
    for (let key of requiredArray) {
      if (!this.state.profileData[key[0]]) return;
    }

    // convert skills back to an array and trim leading/trailing white spaces
    let skillsArray = this.state.profileData.skills.split(",");
    for (let i = 0; i < skillsArray.length; i++) {
      skillsArray[i] = skillsArray[i].trim();
    }
    let newProfileData = {
      ...this.state.profileData,
      skills: skillsArray
    };

    this.props.profileNew(newProfileData).then(() => {
      this.setState({
        submitForm: true
      });
    });
  };

  uploadFile = e => {
    e.preventDefault();
    let name = e.target.name;
    if (name === "image")
      this.props.uploadImageFile(e.target.files[0]).then(response =>
        this.setState({
          ...this.state,
          profileData: {
            ...this.state.profileData,
            [name]: response.value.url.replace(/\s/g, "")
          }
        })
      );
    else if (name === "resume")
      this.props.uploadResumeFile(e.target.files[0]).then(response =>
        this.setState({
          ...this.state,
          profileData: {
            ...this.state.profileData,
            [name]: response.value.url.replace(/\s/g, "")
          }
        })
      );
  };

  closeModal = () => {
    this.setState({
      submitForm: false
    });
  };

  linkToViewProfile = () => {
    this.setState(
      {
        profileData: {
          firstName: "",
          lastName: "",
          yearOfGrad: "",
          skills: "",
          story: "",
          phone: "",
          email: "",
          linkedin: "",
          github: "",
          website: "",
          image: "",
          resume: "",
          isActive: true
        }
      },
      this.closeModal()
    );
  };

  addDefaultSrc(e) {
    e.target.src = noPic;
  }

  render() {
    return (
      <div>
        {/* New Profile Header */}
        <div className="header-wrap container-fluid">
          <header className="container grad-header">
            <h1>New Graduate Profile</h1>
          </header>
        </div>

        {this.props.hasError ? (
          <div className="container">
            <ErrorMessage errorData="grad-error">
              Sorry! The Graduate Portal is temporarily down. Our engineers are
              aware of the problem and are hard at work trying to fix it. Please
              come back later.
            </ErrorMessage>
          </div>
        ) : (
          <main className="container grad-form">
            {/* OnSubmit Message */}
            <ModalWidget
              show={this.state.submitForm}
              title={"Graduate Added Successfully!"}
              message={"What would you like to do next?"}
              closeModal={this.closeModal}
              linkToViewProfile={this.linkToViewProfile}
              graduateId={this.props.graduateId}
            />

            {/* Profile Image */}
            <div className="profile-thumbnail form-thumbnail">
              {this.state.profileData.image ? (
                <img
                  width={100}
                  height={100}
                  src={this.state.profileData.image}
                  alt="profile"
                  onError={this.addDefaultSrc}
                />
              ) : (
                <div className="missing-btn">
                  <h3>
                    Add
                    <br />
                    Image
                  </h3>
                </div>
              )}
              <div className="choose-btn">
                <h3>
                  {this.state.profileData.image ? "Update" : "Add"}
                  <br />
                  Image
                </h3>
              </div>
              <FieldGroup
                id="image"
                type="file"
                name="image"
                onChange={e => this.uploadFile(e)}
              />
            </div>

            {/* Profile Resume */}
            <div className="form-resume">
              {this.state.profileData.resume ? (
                <img
                  src={resumeIcon}
                  width={100}
                  height={100}
                  alt="Resume icon"
                />
              ) : (
                <div className="missing-btn">
                  <h3>
                    Add
                    <br />
                    Resume
                  </h3>
                </div>
              )}
              <div className="choose-btn">
                <h3>
                  {this.state.profileData.resume ? "Update" : "Add"} Resume
                </h3>
              </div>
              <FieldGroup
                id="resume"
                type="file"
                name="resume"
                onChange={e => this.uploadFile(e)}
              />
            </div>
            <div className="clearfix" />

            {/* Profile Form */}
            <form onSubmit={this.handleNewProfile}>
              <FormGroup
                controlId="first-name"
                validationState={this.state.firstNameValid}
              >
                <ControlLabel>
                  First Name
                  <span
                    className={`helper helper-asterisk ${this.state
                      .firstNameValid && "helper-asterisk-red"}`}
                  >
                    *
                  </span>
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.profileData.firstName}
                  onChange={this.onChangeInput}
                />
              </FormGroup>
              <FormGroup
                controlId="last-name"
                validationState={this.state.lastNameValid}
              >
                <ControlLabel>
                  Last Name
                  <span
                    className={`helper helper-asterisk ${this.state
                      .lastNameValid && "helper-asterisk-red"}`}
                  >
                    *
                  </span>
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={this.state.profileData.lastName}
                  onChange={this.onChangeInput}
                />
              </FormGroup>
              <FormGroup
                controlId="year-of-grad"
                validationState={this.state.yearOfGradValid}
              >
                <ControlLabel>
                  Year of Graduation
                  <span
                    className={`helper helper-asterisk ${this.state
                      .yearOfGradValid && "helper-asterisk-red"}`}
                  >
                    *
                  </span>
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Year of Graduation: YYYY"
                  value={this.state.profileData.yearOfGrad}
                  name="yearOfGrad"
                  onChange={this.onChangeInput}
                />
              </FormGroup>
              <FormGroup controlId="skills">
                <ControlLabel>
                  Skills<span className="helper">- Comma delimited</span>
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Skills"
                  value={this.state.profileData.skills}
                  name="skills"
                  onChange={this.onChangeInput}
                />
              </FormGroup>
              <FormGroup controlId="story">
                <ControlLabel>
                  Story<span className="helper">- Max 800 characters</span>
                </ControlLabel>
                <FormControl
                  componentClass="textarea"
                  type="textarea"
                  placeholder="Story"
                  rows={4}
                  maxLength="800"
                  value={this.state.profileData.story}
                  name="story"
                  onChange={this.onChangeInput}
                />
              </FormGroup>
              <FormGroup controlId="phone">
                <ControlLabel>Phone Number</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Phone Number: XXX-XXX-XXXX"
                  value={this.state.profileData.phone}
                  name="phone"
                  onChange={this.onChangeInput}
                />
              </FormGroup>
              <FormGroup
                controlId="email"
                validationState={this.state.emailValid}
              >
                <ControlLabel>
                  Email
                  <span
                    className={`helper helper-asterisk ${this.state
                      .emailValid && "helper-asterisk-red"}`}
                  >
                    *
                  </span>
                </ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Email"
                  value={this.state.profileData.email}
                  name="email"
                  onChange={this.onChangeInput}
                />
                <FormGroup
                  controlId="password"
                  validationState={this.state.passwordValid}
                >
                  <ControlLabel>
                    Password
                    <span
                      className={`helper helper-asterisk ${this.state
                        .passwordValid && "helper-asterisk-red"}`}
                    >
                      *
                    </span>
                  </ControlLabel>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.profileData.password}
                    onChange={this.onChangeInput}
                  />
                </FormGroup>

                <FormGroup
                  controlId="confirmPassword"
                  validationState={this.state.confirmPasswordValid}
                >
                  <ControlLabel>
                    Confirm Password
                    <span
                      className={`helper helper-asterisk ${this.state
                        .confirmPasswordValid && "helper-asterisk-red"}`}
                    >
                      *
                    </span>
                  </ControlLabel>
                  <FormControl
                    type="password"
                    placeholder="confirm-password"
                    name="confirmPassword"
                    value={this.state.profileData.confirmPassword}
                    onChange={this.onChangeInput}
                  />
                </FormGroup>
              </FormGroup>
              <FormGroup controlId="linkedin">
                <ControlLabel>LinkedIn</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="LinkedIn"
                  value={this.state.profileData.linkedin}
                  name="linkedin"
                  onChange={this.onChangeInput}
                />
              </FormGroup>
              <FormGroup controlId="github">
                <ControlLabel>GitHub</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="GitHub"
                  value={this.state.profileData.github}
                  name="github"
                  onChange={this.onChangeInput}
                />
              </FormGroup>
              <FormGroup controlId="website">
                <ControlLabel>Website</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Website"
                  name="website"
                  onChange={this.onChangeInput}
                />
              </FormGroup>
              <Button
                type="submit"
                className="btn grad-btn grad-btn-admin grad-btn-admin-submit"
                disabled={this.props.isLoading === true}
                onclick={() => this.handleNewProfile}
              >
                {this.props.isLoading ? "LOADING..." : "ADD"}
              </Button>
            </form>
          </main>
        )}
      </div>
    );
  }
}

export default NewProfile;
