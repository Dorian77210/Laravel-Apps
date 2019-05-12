import React, { Component } from 'react';

import QuizzInformation from './QuizzInformation';

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

    render() {
        return (
            <div>
                {
                    !this.state.loading && <QuizzInformation quizz={this.state.quizz.data} />
                }

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
