import React, { Component } from 'react';

import axios from 'axios';

export default class QuizzUpdatorContainer extends Component {

    constructor(props) {
        super(props);
        const quizzID = this.props.match.params.quizzID;
        const storage = JSON.parse( localStorage[ 'appData' ] );
        const login = storage.userData.login;

        axios.get( '/user/' + login + '/quizzes/' + quizzID)
             .then( res => {

             })
             .catch( error => {

             });
    }

    render() {
        return (
            <div>titi</div>
        )
    }
}
