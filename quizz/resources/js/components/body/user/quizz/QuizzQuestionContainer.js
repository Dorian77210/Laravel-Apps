import React, { Component } from 'react';

import { Form, Row, Col, Button } from 'react-bootstrap';

import QuizzAnswerContainer from './QuizzAnswerContainer';

import css from '../../../css/quizz.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash);

import PropTypes from 'prop-types';

class QuizzQuestionContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: this.props.question,
            questionListID: this.props.questionListID,
            addAnswer: this.props.addAnswer,
            deleteQuestion: this.props.deleteQuestion
        };
    }

    render() {
        return (
            <div className="question-container">
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Question {this.state.questionListID}
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                placeholder="Question"
                                defaultValue={this.state.question.content}
                            />
                        </Col>
                        <Col sm={2}>
                            <span onClick={ event => this.state.deleteQuestion( this.state.questionListID - 1)}>
                                <FontAwesomeIcon icon="trash"
                                    className="icon-hover text-center"
                                />
                            </span>
                        </Col>

                    </Form.Group>
                </Form>

                <div>
                    {/* container for each answer */}
                    {this.state.question.answers.map((answer, id) => {
                        return <QuizzAnswerContainer
                            answer={answer}
                            key={'question' + this.state.questionListID + '-answer' + id}
                            answerListID={id + 1}
                        />
                    })}
                </div>
                <Button
                    variant="outline-primary"
                    className="float-right"
                    onClick={event => this.state.addAnswer(this.state.questionListID - 1)}
                >
                    Add answer
                </Button>
                <br /><br />
            </div>
        );
    }
}

QuizzQuestionContainer.propTypes = {
    question: PropTypes.object,
    questionListID: PropTypes.number,
    addAnswer: PropTypes.func,
    deleteQuestion: PropTypes.func
};

export default QuizzQuestionContainer;
