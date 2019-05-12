import React, { Component, Fragment } from 'react';

import { Form, Col, Row, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

class QuizzInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizz: this.props.quizz,
            updateQuizz: this.props.updateQuizz
        };
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
                            <Form.Control type="text"
                                          placeholder="Title"
                                          name="title"
                                          defaultValue={this.state.quizz.title}
                                          onKeyUp={(event) => this.state.updateQuizz( event )}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Resume</Form.Label>
                        <Form.Control as="textarea"
                                      rows="3" name="resume"
                                      style={{ resize: 'none' }}
                                      defaultValue={this.state.quizz.resume}
                                      onKeyUp={(event) => this.state.updateQuizz( event )}
                        />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Check type="checkbox"
                                        name="isPrivate"
                                        label="Is private ?"
                                        defaultChecked={this.state.quizz.isPrivate}
                                        onChange={(event) => this.state.updateQuizz( event )}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Check type="checkbox"
                                        name="isActive"
                                        label="Is active"
                                        defaultChecked={this.state.quizz.isActive}
                                        onChange={(event) => this.state.updateQuizz( event )}
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        );
    }
}

QuizzInformation.propTypes = {
    quizz: PropTypes.object,
    updateQuizz: PropTypes.func
}

export default QuizzInformation;
