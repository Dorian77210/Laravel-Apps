import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import axios from 'axios';

class QuizzInformationUpdator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizz: this.props.quizz
        };


        this.updateValues = this.updateValues.bind( this );
        this.updateQuizz = this.updateQuizz.bind( this );
    }

    updateValues( event ) {
        const target = event.target;

        const inputType = target.type;
        const quizz = this.state.quizz;

        if(inputType == "checkbox") {
            value = !quizz[ target.name ]
        }

        var value = ( inputType === "checkbox" ) ? !quizz[ target.name ] : target.value;

        quizz[ target.name ] = value;
        this.setState({
            quizz: quizz
        });
    }

    updateQuizz() {
        console.log(this.state.quizz);
        axios.patch( '/user/quizzes/' + this.state.quizz.quizzID, this.state.quizz )
             .then( res => {
                console.log(res);
             })
             .catch( error => {
                 console.log(error);
             })
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
                                          onChange={ (event) => this.updateValues( event )}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Resume</Form.Label>
                        <Form.Control as="textarea"
                                      rows="3"
                                      name="resume"
                                      style={{ resize: 'none' }}
                                      onChange={ (event) => this.updateValues( event )}
                                      defaultValue={this.state.quizz.resume}
                        />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Check type="checkbox"
                                        name="isPrivate"
                                        label="Is private"
                                        onChange={ (event) => this.updateValues( event )}
                                        defaultChecked={this.state.quizz.isPrivate}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Check type="checkbox"
                                        name="isActive"
                                        label="Is active"
                                        onChange={ (event) => this.updateValues( event )}
                                        defaultChecked={this.state.quizz.isActive}
                            />
                        </Form.Group>
                    </Form.Row>

                    <div className="float-right">
                        <Button variant="outline-primary"
                                onClick={ (event) => this.updateQuizz()}
                        > Update quizz
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}


QuizzInformationUpdator.propTypes = {
    quizz: PropTypes.object
};

export default QuizzInformationUpdator;
