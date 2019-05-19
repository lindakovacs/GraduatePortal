import React, { Component } from "react";
//import history from "../../history";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class NewUsers extends Component {
  state = {
    showModal: false,
    emailInput: "",
    dataToSend: {
      emails: [],
      isGrad: true
    }
  };

  upload = async (url, method = "PUT") => {
    const token = localStorage.getItem("token");
    const data = this.state.dataToSend;
    const response = await axios(url, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: token ? `Bearer ${token}` : ""
      },
      data
    });
    return response.data;
  };

  handleClick = e => {
    this.setState({ dataToSend: { isGrad: !this.state.dataToSend.isGrad } });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleAddEmails = () => {
    this.setState({ showModal: true });
  };

  notify = () => toast("Wow so easy !");

  handleInput = e => {
    this.setState({ emailInput: e.target.value });
  };

  emailValidation = () => {
    let emailArray = [];
    emailArray = this.state.emailInput.split(",");

    let trimmedArray = [];
    trimmedArray = emailArray.map(item => item.trim());

    let numberOfAts = 0;
    let numberOfCommas = 0;

    if (this.state.emailInput.indexOf("@") !== -1) {
      numberOfAts = this.state.emailInput.match(/@/g).length;
    }

    if (this.state.emailInput.indexOf(",") !== -1) {
      numberOfCommas = this.state.emailInput.match(/,/g).length;
    }

    if (trimmedArray.length === 1 && numberOfAts === 1) {
      //alert success

      this.notify();
      this.setState({ showModal: false });
      //submitEmails(trimmedArray);
    } else if (numberOfAts - numberOfCommas !== 1) {
      //alert input error
    } else {
      //alert it went ok
      this.setState({ showModal: false });
      //submitEmails(trimmedArray);
    }
  };

  // submitEmails = emailArray => {};

  // successToast = () => toast("Everything went great!", { autoClose: 7000 });
  // badInputToast = () =>
  //   toast(
  //     "Please check your input to ensure each email address is separated by a comma",
  //     { autoClose: 7000 }
  //   );
  // serverErrorToast = () =>
  //   toast("We encountered an error communicating with the server.", {
  //     autoClose: 7000
  //   });

  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />

        <Button onClick={e => this.handleAddEmails(e)}>Add users</Button>

        <Modal
          show={this.state.showModal}
          onHide={e => this.handleClose(e)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title">
              Add email addresses, separated by a comma.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  onClick={e => this.handleClick(e.target.checked)}
                />
                <label class="form-check-label">
                  These new accounts will be admin accounts
                </label>
              </div>

              <div class="form-group">
                <textarea
                  class="form-control"
                  id="message-text"
                  onChange={e => this.handleInput(e)}
                  value={this.state.emailInput}
                />
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={e => this.handleClose(e)}>
              Close
            </Button>
            <Button variant="primary" onClick={this.emailValidation}>
              Add new users
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default NewUsers;
