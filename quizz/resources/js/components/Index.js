import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import Header from './header/Header';
import { Body } from './body/Body';

export default class Index extends Component {

    render() {
        return (
            <div className="container">
                <Router>
                    <Header />
                    <Body />
                </Router>
            </div>
        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
