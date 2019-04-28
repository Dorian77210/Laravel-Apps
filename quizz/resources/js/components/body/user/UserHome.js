import React, { Component } from 'react';

import axios from 'axios';

export default class UserHome extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        const appData = JSON.parse( localStorage[ 'appData' ] );
        const userData = appData.userData;

        const token = userData.token;
        const login = userData.login;

        axios.get( '/user/quizzes/' )
             .then(result => {
                console.log("result", result);
             })
             .catch(error => {
                console.log("error", error);

             });
    }
    render() {
        return (
            <div>Welcome to your home</div>
        )
    }
}
