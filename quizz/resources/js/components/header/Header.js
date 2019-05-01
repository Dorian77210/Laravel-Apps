import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import IndexHeader from './IndexHeader';
import UserHeader from './../header/user/UserHeader';

export default class Header extends Component {

    render() {
        return (
            <div className="header">
                <Route exact path={["/", "/sign-in", "/sign-up", "/about"]} component={IndexHeader} />
                <Route path="/log" component={UserHeader} />
                <Route exact path={[ '/user/dashboard', '/user/dashboard/surveys', '/user/dashboard/quizzes', '/user/quizzes/create' ] } component={UserHeader} />
            </div>
        )
    }
}
