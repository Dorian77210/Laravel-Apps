import React, { Component } from 'react';

import { Form, Row, Col, Button } from 'react-bootstrap';

import QuizzAnswerContainer from './QuizzAnswerContainer';

import css from '../../../css/quizz.css';

import PropTypes from 'prop-types';

class QuizzQuestionContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: this.props.question,
            questionListID: this.props.questionListID
        };

        this.addAnswer = this.addAnswer.bind( this );
    }

    addAnswer() {
        const answerListID = Object.keys(this.state.question.answers).length;

        this.state.question.answers.push( {
            content: 'Answer',
            answerListID: answerListID + 1,
            isCorrectAnswer: false // default value
        } );
    }

    render() {
        return (
            <div className="question-container">
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Question {this.state.questionListID}
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                placeholder="Question"
                                defaultValue={this.state.question.content}
                            />
                        </Col>
                    </Form.Group>
                </Form>

                <div>
                    {/* container for each answer */}
                    { this.state.question.answers.map( (answer, id) => {
                        return <QuizzAnswerContainer
                                    answer={answer}
                                    key={id}
                                    answerListID={id + 1}
                                />
                    })}
                </div>
                <Button
                    variant="outline-primary"
                    className="float-right"
                    onClick={ event => this.addAnswer() }
                >
                    Add answer
                </Button>
                <br/><br/>
            </div>
        );
    }
}

QuizzQuestionContainer.propTypes = {
    question: PropTypes.object,
    questionListID: PropTypes.number,
    updateQuestion: PropTypes.func
};

export default QuizzQuestionContainer;
