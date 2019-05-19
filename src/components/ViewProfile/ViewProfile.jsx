import React, { Component } from "react";
import { Button, Media } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Loading from "../Widgets/Loading";
import ErrorMessage from "../Widgets/ErrorMessage";
import noPic from "../../images/no-profile.svg";

class ViewProfile extends Component {
  state = {
    graduateId: this.props.match.params.graduateId,
    profileData: null
  };

  addDefaultSrc(e) {
    e.target.src = noPic;
  }

  handleActivation = e => {
    e.target.blur();
    let newProfileData = this.state.profileData;
    newProfileData[0].isActive = Math.abs(
      this.state.profileData[0].isActive - 1
    );
    const editProfileData = {
      graduateId: newProfileData[0]._id,
      firstName: newProfileData[0].firstName,
      lastName: newProfileData[0].lastName,
      yearOfGrad: newProfileData[0].yearOfGrad,
      skills: newProfileData[0].skills,
      story: newProfileData[0].story,
      phone: newProfileData[0].phone,
      email: newProfileData[0].links.email,
      linkedin: newProfileData[0].links.linkedin,
      github: newProfileData[0].links.github,
      website: newProfileData[0].links.website,
      image: newProfileData[0].image,
      resume: newProfileData[0].resume,
      isActive: newProfileData[0].isActive
    };

    this.setState(
      {
        profileData: newProfileData
      },
      () => this.props.profileEdit(editProfileData)
    );
  };

  componentDidMount() {
    this.props.fetchAllProfiles().then(() => {
      this.setState({
        profileData: Object.values(this.props.profiles).filter(profile => {
          return profile._id.toString() === this.state.graduateId.toString();
        })
      });
    });
  }

  render() {
    return (
      <div>
        <div className="header-wrap container-fluid">
          <header className="container grad-header">
            <h1>Graduate Profile</h1>

            {/* Add Profile Button */}
            {this.props.isAdmin && (
              <LinkContainer to="/profile/add">
                <Button
                  className="grad-btn grad-btn-admin add-btn"
                  title="Add new graduate profile"
                  bsSize="small"
                >
                  +
                </Button>
              </LinkContainer>
            )}
          </header>
        </div>
        <main className="container">
          <div className="profile-directory">
            <div className="ProfileDirectory-profiles">
              {this.props.isLoading ? (
                <Loading />
              ) : this.props.hasError ? (
                <ErrorMessage errorData="grad-error">
                  Sorry! The Graduate Portal is temporarily down. Our engineers
                  are aware of the problem and are hard at work trying to fix
                  it. Please come back later.
                </ErrorMessage>
              ) : (
                this.state.profileData &&
                Object.values(this.state.profileData).map(graduate => {
                  const key = "graduate-" + graduate._id;
                  return (
                    <div className="card" key={key}>
                      <Media>
                        <Media.Left>
                          <div className="profile-thumbnail">
                            {graduate.image ? (
                              <img
                                width={100}
                                height={100}
                                src={graduate.image}
                                alt="profile"
                                onError={this.addDefaultSrc}
                              />
                            ) : (
                              <img
                                width={100}
                                height={100}
                                src={noPic}
                                alt="profile missing"
                              />
                            )}
                          </div>
                        </Media.Left>
                        <Media.Body>
                          <Media.Heading>
                            {graduate.firstName + " " + graduate.lastName}
                          </Media.Heading>
                          <p>{graduate.yearOfGrad}</p>
                          <p className="skills">{graduate.skills.join(", ")}</p>
                          <p>{graduate.story}</p>
                          {graduate.phone && <p>Phone: {graduate.phone}</p>}
                          {graduate.links &&
                            Object.entries(graduate.links).map(profileLinks => {
                              const [linkKey] = profileLinks;
                              const icons = {
                                linkedin: "fab fa-linkedin-in",
                                github: "fab fa-github",
                                website: "fas fa-globe",
                                email: "fas fa-envelope"
                              };
                              const titles = {
                                linkedin: `View ${
                                  graduate.firstName
                                }'s linkedin profile`,
                                github: `View ${
                                  graduate.firstName
                                }'s github profile`,
                                website: `View ${graduate.firstName}'s website`,
                                email: `Contact ${graduate.firstName}`
                              };
                              // test to see if its truthy
                              if (graduate.links[linkKey])
                                return (
                                  <Button
                                    key={linkKey}
                                    className="grad-btn grad-btn-primary links"
                                    bsSize="small"
                                    href={
                                      graduate.links[linkKey] ===
                                      graduate.links.email
                                        ? `mailto:${graduate.links.email}`
                                        : graduate.links[linkKey]
                                    }
                                    title={titles[linkKey]}
                                    target={
                                      graduate.links[linkKey] ===
                                      graduate.links.email
                                        ? ""
                                        : "_blank"
                                    }
                                  >
                                    <i
                                      className={`${
                                        icons[linkKey]
                                      } fa-lg acc-primary`}
                                    />
                                  </Button>
                                );
                              else return null;
                            })}

                          {/* View Resume Button */}
                          {graduate.resume && (
                            <Button
                              className="grad-btn grad-btn-primary"
                              bsSize="small"
                              href={graduate.resume}
                              target="_blank"
                            >
                              View Resume
                            </Button>
                          )}

                          {/* Active/Inactive Button */}
                          {this.props.isAdmin &&
                            (graduate.isActive ? (
                              <Button
                                className="grad-btn grad-btn-admin-active"
                                bsSize="small"
                                onClick={e => this.handleActivation(e)}
                              >
                                <span>Active</span>
                              </Button>
                            ) : (
                              <Button
                                className="grad-btn grad-btn-admin-inactive"
                                bsSize="small"
                                onClick={e => this.handleActivation(e)}
                              >
                                <span>InActive</span>
                              </Button>
                            ))}

                          {/* if isGrad is true the Active/Inactive button wont render */}
                          {this.props.isGrad &&
                            (graduate.isActive
                              ? !(
                                  <Button
                                    className="grad-btn grad-btn-admin-active"
                                    bsSize="small"
                                    onClick={e =>
                                      this.handleActivation(e, graduate._id)
                                    }
                                  >
                                    <span>Active</span>
                                  </Button>
                                )
                              : !(
                                  <Button
                                    className="grad-btn grad-btn-admin-inactive"
                                    bsSize="small"
                                    onClick={e =>
                                      this.handleActivation(e, graduate._id)
                                    }
                                  >
                                    <span>InActive</span>
                                  </Button>
                                ))}
                          {/* Edit Profile Button */}
                          {this.props.isAdmin && (
                            <LinkContainer
                              to={`/profile/${this.state.graduateId}/edit`}
                            >
                              <Button
                                className="grad-btn grad-btn-admin"
                                bsSize="small"
                              >
                                Edit
                              </Button>
                            </LinkContainer>
                          )}
                        </Media.Body>
                      </Media>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default ViewProfile;
