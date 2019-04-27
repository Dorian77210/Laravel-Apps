import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import IndexHeader from './IndexHeader';
import UserHeader from './UserHeader';

export default class Header extends Component {

    render() {
        return (
            <div className="header">
                <Route path="/" component={IndexHeader} />
                <Route path="/log" component={UserHeader} />
            </div>
        )
    }
}
