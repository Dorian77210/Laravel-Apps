import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import IndexBody from './IndexBody';
import SignInBody from './SignInBody';
import SignUpBody from './SignUpBody';
import UserHome from './user/UserHome';

export class Body extends Component {

    render() {
        return (
            <div className="body" style={{marginTop: '5%'}}>
                <Route exact path="/" component={IndexBody} />
                <Route path="/sign-in" component={SignInBody} />
                <Route path="/sign-up" component={SignUpBody} />
                <Route path="/user/dashboard" component={UserHome} />
            </div>
        )
    }
}
