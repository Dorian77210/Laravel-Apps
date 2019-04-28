import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import IndexBody from './IndexBody';
import SignInBody from './SignInBody';
import SignUpBody from './SignUpBody';
import UserHome from './user/UserHome';
import ErrorBody from './ErrorBody';

export class Body extends Component {

    render() {
        return (
            <div className="body" style={{marginTop: '5%'}}>
                <Route exact path="/" component={IndexBody} />
                <Route exact path="/sign-in" component={SignInBody} />
                <Route exact path="/sign-up" component={SignUpBody} />
                <Route exact path="/user/dashboard" component={UserHome} />
                <Route exact path="/error" component={ErrorBody} />
            </div>
        )
    }
}
