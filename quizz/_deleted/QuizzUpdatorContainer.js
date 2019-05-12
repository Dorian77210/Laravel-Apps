import React, { Component } from 'react';

import ErrorModal from '../../../modal/ErrorModal';

import { Button } from 'react-bootstrap';

import QuizzInformationUpdator from './QuizzInformationUpdator';
import QuizzQuestionContainer from './QuizzQuestionContainer';

import axios from 'axios';

export default class QuizzUpdatorContainer extends Component {

    constructor(props) {
        super(props);
        const quizzID = this.props.match.params.quizzID;
        const storage = JSON.parse( localStorage[ 'appData' ] );
        const login = storage.userData.login;

        this.state = {
            loading: true
        };

        // functions of the component
        this.addQuestion = this.addQuestion.bind( this );
        this.removeQuestion = this.removeQuestion.bind( this );
        this.updateQuestion = this.updateQuestion.bind( this );

        this.modalRef = React.createRef();
    }

    componentWillMount() {
        const quizzID = this.props.match.params.quizzID;
        const storage = JSON.parse( localStorage[ 'appData' ] );
        const login = storage.userData.login;

        this.setState( {
            loading: true
        } );

        axios.get( '/user/' + login + '/quizzes/' + quizzID )
             .then( res => {
                 const data = res.data;
                 if( data.success ) {
                     const quizz = data.quizz;
                     this.setState( {
                        quizz: quizz,
                        loading: false,
                        maxQuestionID: Object.keys(quizz.questions).length
                     } );
                 } else {
                     this.props.history.push( '/error' );
                 }
             })
             .catch( error => {
                const modal = this.modalRef.current;
                modal.setState( {
                    title: 'Something was wrong',
                    content: 'Error when retrieving your quizz. Please reload your browser.',
                    show: true
                } );
             });
    }

    updateQuestion( question ) {

    }

    addQuestion() {
        const maxQuestionID = this.state.maxQuestionID;

        this.state.quizz.questions.push( {
            content: 'Question ?',
            listID: maxQuestionID,
            answers: []
        } );

        this.setState( {
            maxQuestionID: maxQuestionID + 1
        } );
    }

    removeQuestion( questionID ) {
        const quizz = this.state.quizz;
        const questions = quizz.questions;
        questions.filter( (question, index) => index != questionID );
    }

    render() {
        return (
            <div>
                {
                    !this.state.loading && <QuizzInformationUpdator quizz={this.state.quizz.data} />
                }
                <ErrorModal
                    title=""
                    content=""
                    ref={this.modalRef}
                />

                <br/><br/><br/>

                <div>
                    { !this.state.loading && this.state.quizz.questions.map( (question, id) => {
                        return <QuizzQuestionContainer
                                question={question}
                                key={id}
                                questionListID={id + 1}
                                updateQuestion={this.updateQuestion}
                        />
                    })}
                </div>

                <div className="float-right">
                    <br/><br/>
                    <Button
                        variant="outline-primary"
                        onClick={ (event) => this.addQuestion()}
                    >
                        Add question
                    </Button>

                    <Button
                        variant="outline-primary"
                    >
                        Finish updates
                    </Button>
                </div>
            </div>
        )
    }
}
