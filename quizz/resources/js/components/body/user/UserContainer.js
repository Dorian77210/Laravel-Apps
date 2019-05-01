import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import { Route } from 'react-router-dom';

import PropTypes from 'prop-types';

import ErrorModal from './../../modal/ErrorModal';

import QuizzesContainer from './QuizzesContainer';
import SurveysContainer from './SurveysContainer';
import axios from 'axios';

class UserContainer extends Component {

    constructor(props) {
        super(props);

        this.goTo = this.goTo.bind( this );

        this.modalRef = React.createRef();

        this.state = {
            loading: true
        };
    }

    goTo(event, link) {
        event.preventDefault();
        this.props.history.push( link );
    }

    componentWillMount() {
        // quizzes
        axios.get( '/user/quizzes/' )
             .then(result => {
                const data = result.data.quizzes;
                this.setState({
                    quizzes: data,
                    loading: false
                });
             })
             .catch(error => {
                const modal = this.modalRef.current;
                modal.setState({
                    show: true,
                    title: 'Error',
                    content: 'Something was wrong...'
                });
             });
    }

    render() {
        return (
            <div>
                <div className="float-right">
                    <Button
                        variant="outline-primary"
                        onClick={ (event) => this.goTo( event, '/user/dashboard/quizzes' )}
                        >
                        Quizzes
                    </Button>

                    <Button
                        variant="outline-primary"
                        onClick={ (event) => this.goTo( event, '/user/dashboard/surveys' )}
                    >
                        Surveys
                    </Button>
                </div>

                <div>
                { !this.state.loading &&
                    <Route exact path={[ '/user/dashboard', '/user/dashboard/quizzes' ] }
                    component={ () => <QuizzesContainer quizzes={this.state.quizzes} goTo={this.goTo} />}
                    />
                }
                    <Route exact path={ [ '/user/dashboard/surveys' ] } component={SurveysContainer} />
                </div>

                {/*Error modal */}
                <ErrorModal
                    content=""
                    title=""
                    ref={this.modalRef}
                />
            </div>
        );
    }
}

UserContainer.propTypes = {
    history: PropTypes.object
};

export default UserContainer;
