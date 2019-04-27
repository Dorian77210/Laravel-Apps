import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import IndexBody from './IndexBody';
import SignInBody from './SignInBody';
import SignUpBody from './SignUpBody';

export class Body extends Component {

    render() {
        return (
            <div class="body">
                <Route exact path="/" component={IndexBody} />
                <Route path="/sign-in" component={SignInBody} />
                <Route path="/sign-up" component={SignUpBody} />
            </div>
        )
    }
}
