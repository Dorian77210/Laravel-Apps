import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';

export default class WelcomeModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            show: true
        };

        this.state.user.isComeBack = false;

        const storage = JSON.parse( localStorage[ 'appData'] );
        storage.userData = this.state.user;
        localStorage[ 'appData' ] = JSON.stringify( storage );

        this.close = this.close.bind(this);
    }

    close() {
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <Modal
                size="sm"
                show={this.state.show}
                onHide={this.close}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Welcome
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Good come back {this.state.user.login} !
                </Modal.Body>
            </Modal>
        );
    }
}
