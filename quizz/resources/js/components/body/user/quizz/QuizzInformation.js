import React, { Component, Fragment } from 'react';

import { Form, Col, Row, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

class QuizzInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizz: {
                title: '',
                resume: '',
                isPrivate: false,
                isActive: false,
            }
        };

        this.validateInformation = this.props.validateInformation;
        this.updateValues = this.updateValues.bind(this);
    }

    updateValues(event) {
        const target = event.target;

        const inputType = target.type;
        const quizz = this.state.quizz;

        if(inputType == "checkbox") {
            value = !quizz[ target.name ]
        }

        var value = ( inputType === "checkbox" ) ? !quizz[ target.name ] : target.name;

        quizz[ target.name ] = value;
        this.setState({
            quizz: quizz
        });
    }


    render() {
        return (
            <div>
                <Form>
                    <h6 className="text-center">Information of your quizz</h6>
                    <Form.Group as={Row}>
                        <Form.Label column sm={1}>
                            Title
                    </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Title" name="title" onKeyUp={(event) => this.updateValues(event)} />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Resume</Form.Label>
                        <Form.Control as="textarea" rows="3" name="resume" style={{ resize: 'none' }} onKeyUp={(event) => this.updateValues(event)} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Check type="checkbox" name="isPrivate" label="Is private ?" onChange={(event) => this.updateValues(event)} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Check type="checkbox" name="isActive" label="Is active"  onChange={(event) => this.updateValues(event)} />
                        </Form.Group>
                    </Form.Row>

                    <div className="float-right">
                        <Button
                            variant="outline-primary"
                            onClick={(event) => this.validateInformation(this.state.quizz)}
                        >
                            Validate quizz
                    </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

QuizzInformation.propTypes = {
    validateInformation: PropTypes.func
}

export default QuizzInformation;
