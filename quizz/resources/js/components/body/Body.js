import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import IndexBody from './IndexBody';
import SignInBody from './SignInBody';
import SignUpBody from './SignUpBody';
import UserHome from './user/UserHome';
import ErrorBody from './ErrorBody';
import QuizzCreatorContainer from './user/quizz/QuizzCreatorContainer';
import QuizzUpdatorContainer from './user/quizz/QuizzUpdatorContainer';

export class Body extends Component {

    render() {
        return (
            <div className="body" style={{marginTop: '5%'}}>
                <Route exact path="/" component={IndexBody} />
                <Route exact path="/sign-in" component={SignInBody} />
                <Route exact path="/sign-up" component={SignUpBody} />
                <Route exact path={[ '/user/dashboard', '/user/dashboard/surveys', '/user/dashboard/quizzes' ]} component={UserHome} />
                <Route exact path={[ '/user/quizzes/create' ]} component={QuizzCreatorContainer} />
                <Route exact path={ [ '/user/quizzes/update/:quizzID' ] } component={QuizzUpdatorContainer} />
                <Route exact path="/error" component={ErrorBody} />
            </div>
        )
    }
}
