import React, { Component } from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';

import css from '../../../css/quizz.css';

import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add( faTrash );

class QuizzAnswerContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answerListID: this.props.answerListID,
            answer: this.props.answer,
            questionID: this.props.questionID,
            deleteAnswer: this.props.deleteAnswer
        };


    }

    render() {
        return (
            <div className="answer-container">
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Answer {this.state.answerListID}
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="Answer"
                                defaultValue={this.state.answer.content}
                            />
                        </Col>

                        <Col sm={2}>
                            <Form.Check type="checkbox"
                                        name="isCorrectAnswer"
                                        label="Is correct answer ?"
                            />
                        </Col>

                        <Col sm={2}>
                            <span onClick={ event => this.state.deleteAnswer( this.state.questionID, this.state.answerListID - 1) }>
                                <FontAwesomeIcon icon="trash"
                                                 className="text-center icon-hover"
                                />
                            </span>
                        </Col>

                    </Form.Group>
                </Form>
            </div>
        );
    }
}


QuizzAnswerContainer.propTypes = {
    answerListID: PropTypes.number,
    answer: PropTypes.object,
    deleteAnswer: PropTypes.func,
    questionID: PropTypes.number
}

export default QuizzAnswerContainer;
