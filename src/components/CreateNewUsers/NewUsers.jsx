import React, { Component } from "react";
import history from "../../history";
import { Button, Modal, ModalDialog } from "react-bootstrap";

class NewUsers extends Component {
  state = {
    showModal: false
  };

  handleClose() {
    this.setState({ showModal: false });
  }

  handleAddEmails() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleAddEmails}>
          Custom Width Modal
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Custom Modal Styling
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
              unde commodi aspernatur enim, consectetur. Cumque deleniti
              temporibus ipsam atque a dolores quisquam quisquam adipisci
              possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
              quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
              Mollitia reiciendis porro quo magni incidunt dolore amet atque
              facilis ipsum deleniti rem!
            </p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default NewUsers;
