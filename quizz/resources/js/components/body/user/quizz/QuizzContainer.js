import React, { Component } from 'react';

import QuizzInformation from './QuizzInformation';
import QuizzQuestionContainer from './QuizzQuestionContainer';

import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

import ErrorModal from '../../../modal/ErrorModal';

class QuizzContainer extends Component {

    constructor(props) {
        super(props);
        const isNew = (this.props.isNew) ? true : false;

        this.state = {
            isNew: isNew,
            loading: true,
        };

        this.addQuestion = this.addQuestion.bind(this);
        this.addAnswer = this.addAnswer.bind( this );
        this.deleteQuestion = this.deleteQuestion.bind( this );
        this.deleteAnswer = this.deleteAnswer.bind( this );
        this.updateAnswer = this.updateAnswer.bind( this );
        this.updateQuestion = this.updateQuestion.bind( this );
        this.updateQuizz = this.updateQuizz.bind( this );

        this.modalRef = React.createRef();
    }

    componentWillMount() {
        if (this.state.isNew) {
            // create route
            this.setState({
                quizz: {
                    data: {
                        isPrivate: false,
                        isActive: false,
                        title: '',
                        isNew: true,
                        isDirty: false
                    },
                    questions: []
                },
                loading: false
            });
        } else {
            // update route
            const quizzID = this.props.match.params.quizzID;
            const storage = JSON.parse(localStorage['appData']);
            const login = storage.userData.login;

            axios.get('/user/' + login + '/quizzes/' + quizzID)
                .then(res => {
                    const data = res.data;
                    if (data.success) {
                        const quizz = data.quizz;
                        this.setState({
                            quizz: quizz,
                            loading: false,
                            maxQuestionID: Object.keys(quizz.questions).length
                        });
                    } else {
                        this.props.history.push('/error');
                    }
                })
                .catch(error => {
                    const modal = this.modalRef.current;
                    modal.setState({
                        title: 'Something was wrong',
                        content: 'Error when retrieving your quizz. Please reload your browser.',
                        show: true
                    });
                });
        }
    }

    updateQuizz( event ) {
        const quizz = this.state.quizz;
        const data = quizz.data;

        if( !data.isDirty ) {
            data.isDirty = true;
        }

        const target = event.target;
        const inputType = target.type;
        const value = (inputType === "checkbox") ? !data[target.name] : target.value;

        data[ target.name ] = value;
        quizz.data = data;

        console.log( data );

        this.setState( {
            quizz: quizz
        } );
    }

    // util functions
    addQuestion() {
        const quizz = this.state.quizz;
        const questions = quizz.questions;
        questions.push( {
            content: 'Question ?',
            isDirty: false,
            isNew: true,
            answers: []
        } );

        quizz.questions = questions;

        // update the new state
        this.setState( {
            quizz: quizz
        } );
    }

    deleteQuestion( questionID ) {
        const quizz = this.state.quizz;
        var questions = quizz.questions;
        questions = questions.filter( ( question, id ) => id != questionID );
        quizz.questions = questions;

        // update the new state
        this.setState( {
            quizz: quizz
        } );
    }

    addAnswer( questionID ) {
        const quizz = this.state.quizz;
        const questions = quizz.questions;

        questions[ questionID ].answers.push( {
            content: '',
            isRightAnswer: false, // default value
            isNew: true,
            isDirty: false,
        } );

        quizz.questions = questions;

        // update the new state
        this.setState( {
            quizz: quizz
        } );
    }

    deleteAnswer( questionID, answerID ) {
        const quizz = this.state.quizz;
        const questions = quizz.questions;
        const question = questions[ questionID ];
        var answers = question.answers;

        question.answers = answers.filter( ( answer, id ) => answerID != id );
        questions[ questionID ] = question;
        quizz.questions = questions;

        this.setState( {
            quizz: quizz
        } );
    }

    updateQuestion( questionID, content ) {
        const quizz = this.state.quizz;
        const questions = quizz.questions;
        const question = questions[ questionID ];

        if( !question.isDirty ) question.isDirty = true;
        question.content = content;

        questions[ questionID ] = question;
        quizz.questions = questions;

        this.setState( {
            quizz: quizz
        } );
    }

    updateAnswer( questionID, answerID, event ) {
        const quizz = this.state.quizz;
        const questions = quizz.questions;
        const question = questions[ questionID ];
        const answer = question.answers[ answerID ];

        const target = event.target;
        const inputType = target.type;
        const value = (inputType === "checkbox") ? !answer[target.name] : target.value;


        if( !answer.isDirty ) answer.isDirty = true;

        answer[ target.name ] = value;

        question.answers[ answerID ] = answer;
        questions[ questionID ] = question;
        quizz.questions = questions;

        this.setState( {
            quizz: quizz,
        } );
    }

    render() {
        return (
            <div>
                {
                    !this.state.loading && <QuizzInformation
                                            quizz={this.state.quizz.data}
                                            updateQuizz={this.updateQuizz}
                    />
                }

                {/* Question part */}

                <br />

                <div>
                    {!this.state.loading && this.state.quizz.questions.map((question, id) => {
                        return <QuizzQuestionContainer
                            question={question}
                            key={'question' + id}
                            questionListID={id + 1}
                            addAnswer={this.addAnswer}
                            deleteQuestion={this.deleteQuestion}
                            deleteAnswer={this.deleteAnswer}
                            updateQuestion={this.updateQuestion}
                            updateAnswer={this.updateAnswer}
                        />
                    })}

                    <br/><br/>

                    <div className="float-right">
                        <Button
                            variant="outline-primary"
                            onClick={event => this.addQuestion()}
                        >
                            Add question
                    </Button>

                    </div>

                    <br/><br/>
                </div>

                <div className="float-right">
                    {this.state.isNew
                        ? <Button
                            variant="outline-primary"
                        >
                            Create quizz
                            </Button>
                        : <Button
                            variant="outline-primary"
                        >
                            Update quizz
                            </Button>
                    }

                </div>

                <ErrorModal
                    title=""
                    content=""
                    ref={this.modalRef}
                />
            </div>
        )
    }
}

QuizzContainer.propTypes = {
};

export default QuizzContainer;
