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
            cache: {
                questions: [],
                answers: []
            }
        };

        this.addQuestion = this.addQuestion.bind(this);
        this.addAnswer = this.addAnswer.bind( this );
        this.deleteQuestion = this.deleteQuestion.bind( this );
        this.deleteAnswer = this.deleteAnswer.bind( this );
        this.updateAnswer = this.updateAnswer.bind( this );
        this.updateQuestion = this.updateQuestion.bind( this );
        this.updateQuizz = this.updateQuizz.bind( this );
        this.createQuizz = this.createQuizz.bind( this );

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

        this.setState( {
            quizz: quizz
        } );
    }

    // util functions

    /* QUESTION FUNCTIONS */
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
        const question = questions[ questionID ];
        questions = questions.filter( ( question, id ) => id != questionID );
        quizz.questions = questions;

        // if question isn't new, put it in the cache
        if( !question.isNew ) {
            const cache = this.state.cache;
            cache.questions.push( questions[ questionID ] );
            this.setState( {
                cache: cache
            } );
        }
        // update the new state
        this.setState( {
            quizz: quizz
        } );
    }

    /* ANSWER FUNCTIONS */

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
        const answer = answers[ answerID ];

        question.answers = answers.filter( ( answer, id ) => answerID != id );
        questions[ questionID ] = question;
        quizz.questions = questions;

        // if the answer isn't new, put it in the cache
        if( !answer.isNew ) {
            const cache = this.state.cache;
            cache.answers.push( answer );
            this.setState( {
                cache: cache
            } );
        }

        this.setState( {
            quizz: quizz
        } );
    }

    /* UPDATE FUNCTIONS */
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

    createQuizz() {
        // function to save the quizz in the API
        const modal = this.modalRef.current;

        axios.post( '/user/quizzes/create', this.state.quizz )
             .then( res => {

             } )
             .catch( error => {

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
                            onClick={ event => this.createQuizz() }
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
