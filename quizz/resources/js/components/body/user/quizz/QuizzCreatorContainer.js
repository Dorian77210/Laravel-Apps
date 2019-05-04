import React, { Component } from 'react';
import QuizzInformation from './QuizzInformation';

import ErrorModal from '../../../modal/ErrorModal';

import axios from 'axios';

export default class QuizzCreatorContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCompleteInformation: false
        };

        this.modal = React.createRef();
    }

    validateInformation( quizz ) {
        if (!this.state.isCompleteInformation) {
            this.setState({
                isCompleteInformation: true
            });

            // create the quizz in the database
            axios.post( '/user/quizzes/create', quizz )
                 .then( res => {
                     console.log(res);
                 })
                 .catch( error => {
                     console.log(error);
                 });
        }
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    Your are in the window of creation of quizzes. You have to write the general information of the quizz and write the question/answer of it !
                </div>
                <br /><br />

                <ErrorModal
                    content=""
                    title=""
                    ref={this.modal}
                />
                <QuizzInformation validateInformation={this.validateInformation} />

            </div>
        );
    }
}
