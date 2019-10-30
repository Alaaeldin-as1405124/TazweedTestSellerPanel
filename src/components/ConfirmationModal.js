import React, { Component } from 'react';
import {Modal,Button} from "react-bootstrap";


class ConfirmationModal extends Component {

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please choose your action.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.close}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.props.reject}>
                            Reject
                        </Button> <Button variant="primary" onClick={this.props.accept}>
                            Accept
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ConfirmationModal;

