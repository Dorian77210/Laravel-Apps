import React, { Component } from 'react';

import { Link } from 'react-router-dom'

export default class ErrorBody extends Component {

    render() {
        return (
            <div>Your session is invalid. You can go to the <Link to="/">home</Link>, <Link to="/sign-up">create an account</Link>, or <Link to="/sign-in">connect yourself.</Link>
            </div>
        );
    }
}
