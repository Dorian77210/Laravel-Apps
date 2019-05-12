import React, { Component } from 'react';

import { From, Button, Row, Col } from 'react-bootstrap';

import css from '../../../css/quizz.css';

import PropTypes from 'prop-types';

class QuizzAnswerContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answerListID: this.props.answerListID,
            answer: this.props.answer
        };


    }

    render() {
        return (
            <div className="answer-container">
                Answer container
            </div>
        );
    }
}


QuizzAnswerContainer.propTypes = {
    answerListID: PropTypes.number,
    answer: PropTypes.object,
}

export default QuizzAnswerContainer;
