import React, { Component } from 'react';

import PropTypes from 'prop-types';

class QuizzAnswerContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            answerKey: this.props.answerKey,
            answer: this.props.answerContent
        };


    }

    render() {
        return (
            <div>Answer container</div>
        );
    }
}


QuizzAnswerContainer.propTypes = {
    answerKey: PropTypes.string,
    answerContent: PropTypes.array
}

export default QuizzAnswerContainer;
