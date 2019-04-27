import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';

import { MDBIcon } from "mdbreact"

export default class IndexHeader extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Menu</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                exact={true}
                                className="nav-link"
                                activeClassName="active"
                            >
                                <MDBIcon icon="home" />Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/sign-in"
                                exact={true}
                                className="nav-link"
                                activeClassName="active"
                            >
                                Sign in
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/sign-up"
                                exact={true}
                                className="nav-link"
                                activeClassName="active"
                            >
                                Sign up
                            </NavLink>
                        </li>

                        <li className="about">
                            <NavLink to="/about"
                                     exact={true}
                                     className="nav-link"
                                     activeClassName="active"
                            >
                                About us
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}
