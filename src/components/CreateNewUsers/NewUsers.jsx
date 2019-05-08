import React, { Component } from "react";
//import history from "../../history";
import { Button, Modal /*ModalDialog*/ } from "react-bootstrap";

class NewUsers extends Component {
  state = {
    showModal: false,
    emailInput: ""
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleAddEmails(e) {
    this.setState({ showModal: true });
  }

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
      alert("Thank you!");
      this.setState({ showModal: false });
      //submitEmails(trimmedArray);
    } else if (numberOfAts - numberOfCommas !== 1) {
      alert(
        "Please check input. Make sure email addresses are separated by a comma."
      );
    } else {
      alert("Thank you!");
      this.setState({ showModal: false });
      //submitEmails(trimmedArray);
    }
  };

  // submitEmails = emailArray => {};

  render() {
    return (
      <div>
        <Button variant="primary" onClick={e => this.handleAddEmails(e)}>
          Add email addresses
        </Button>

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
            <div class="form-group">
              <textarea
                class="form-control"
                id="message-text"
                onChange={e => this.handleInput(e)}
                value={this.state.emailInput}
              />
            </div>
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
