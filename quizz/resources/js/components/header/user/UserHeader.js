import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from 'react-bootstrap';


export default class UserHeader extends Component {

    constructor() {
        super();
        const appData = JSON.parse(localStorage['appData']);
        const userData = appData.userData;
        this.state = {
            user: userData
        };

        this.goTo = this.goTo.bind(this);
        this.logout = this.logout.bind(this);
    }

    goTo(event, link) {
        event.preventDefault();
        this.props.history.push(link);
    }

    logout(event) {
        event.preventDefault();
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink
                            to="/"
                            exact={true}
                            className="nav-link"
                            activeClassName="active"
                        >
                            Home
                            </NavLink>

                    </Nav>

                    <Nav>
                    <Button variant="outline-primary" onClick={ (event) => this.goTo(event, '/user/dashboard') }>Dashboard</Button>
                        <NavDropdown
                            className="basic-nav-dropdown pl-xl-4"
                            title={this.state.user.email}
                        >
                            <NavDropdown.Item
                                onClick={(event) => this.goTo(event, '/user/settings')}
                            >
                                Settings
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={(event) => this.goTo(event, '/user/my-profile')}
                            >
                                My profile
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                onClick={(event) => this.logout(event)}
                                className="border-top border-muted"
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
