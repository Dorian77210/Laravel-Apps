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

        this.modalRef = React.createRef();
    }

    componentWillMount() {
        if (this.state.isNew) {
            // create route
            this.setState({
                quizz: {
                    data: {
                        content: '',
                        isPrivate: false,
                        isActive: false,
                        title: '',
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
            isCorrectAnswer: false, // default value
            isNew: true,
            isDirty: false,
        } );

        quizz.questions = questions;

        // update the new state
        this.setState( {
            quizz: quizz
        } );
    }

    render() {
        return (
            <div>
                {
                    !this.state.loading && <QuizzInformation quizz={this.state.quizz.data} />
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
