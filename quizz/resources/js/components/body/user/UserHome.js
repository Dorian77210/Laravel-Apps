import React, { Component } from 'react';

import ErrorModal from '../../modal/ErrorModal';

import axios from 'axios';
import UserContainer from './UserContainer';
import WelcomeModal from '../../modal/WelcomeModal';

export default class UserHome extends Component {

    constructor() {
        super();
        this.modalRef = React.createRef();

        const storage = JSON.parse( localStorage[ 'appData' ] );
        this.state = {
            user: storage.userData
        };
    }

    componentWillMount() {
        axios.get('/user/quizzes/' )
            .then(result => {
                const response = result.data;
                if(response.hasError) {
                    this.props.history.push( '/error' );
                } else {
                    // retrieve the quizzes
                }
            })
            .catch(error => {
                this.props.history.push('/error');
            });
    }
    render() {
        return (
            <div>
                <div className="text-center">
                    Welcome to your home ! You could show your quizzes and surveys in the board below and create new.
                </div>
                <UserContainer history={this.props.history} />
                { this.state.user.isComeBack && <WelcomeModal user={this.state.user}/> }
            </div>
        )
    }
}
