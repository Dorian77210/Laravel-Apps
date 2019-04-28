import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';

import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

export default class IndexHeader extends Component {

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
                        <NavLink
                            to="/sign-in"
                            exact={true}
                            className="nav-link"
                            activeClassName="active"
                        >
                            Sign in
                            </NavLink>

                        <NavLink
                            to="/sign-up"
                            exact={true}
                            className="nav-link"
                            activeClassName="active"
                        >
                            Sign up
                            </NavLink>

                        <NavLink to="/about"
                            exact={true}
                            className="nav-link"
                            activeClassName="active"
                        >
                            About us
                            </NavLink>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
