import React, { Component } from 'react';
import QuizzInformation from './QuizzInformation';

export default class QuizzCreatorContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCompleteInformation: false
        };
    }

    validateInformation() {
        if (!this.state.isCompleteInformation) {
            this.setState({
                isCompleteInformation: true
            });
        }
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    Your are in the window of creation of quizz. You have to write the general information of the quizz and write the question/answer of it !
                </div>
                <br /><br />

                <QuizzInformation validateInformation={this.validateInformation} />

            </div>
        );
    }
}
