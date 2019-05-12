import React, { Component } from 'react';
import QuizzInformation from '../resources/js/components/body/user/quizz/QuizzInformation';

import ErrorModal from '../../../modal/ErrorModal';

import axios from 'axios';

export default class QuizzCreatorContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCompleteInformation: false
        };

        this.modalRef = React.createRef();

        this.validateInformation = this.validateInformation.bind( this );
    }

    validateInformation( quizz ) {
        if (!this.state.isCompleteInformation) {
            this.setState({
                isCompleteInformation: true
            });

            const modal = this.modalRef.current;
            // create the quizz in the database
            axios.post( '/user/quizzes/create', quizz )
                 .then( res => {
                     const data = res.data;
                     if( data.success ) {
                         modal.setState({
                             show: true,
                             title: data.title,
                             content: data.content
                         });

                         // save the id of the new quizz
                         this.setState({
                             quizzID: data.quizz_ID
                         });
                     }
                 })
                 .catch( error => {
                     modal.setState({
                         show: true,
                         title: data.title,
                         content: data.content
                     });
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
                    ref={this.modalRef}
                />
                <QuizzInformation validateInformation={this.validateInformation} />

            </div>
        );
    }
}
