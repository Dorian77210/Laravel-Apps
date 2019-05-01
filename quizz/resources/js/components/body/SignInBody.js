import React, { Component } from 'react';

import { css } from '@emotion/core';
import { ClimbingBoxLoader } from 'react-spinners';

import Input from '../form/Input';
import InputSubmit from '../form/InputSubmit';
import ErrorModal from '../modal/ErrorModal'

import axios from 'axios';

export default class SignInBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

        this.submitForm = this.submitForm.bind(this);
        this.changeValue = this.changeValue.bind(this);

        this.modalRef = React.createRef();
    }

    changeValue(key, event) {
        const value = event.target.value;
        this.setState({
            [key] : value
        });
    }

    submitForm(event) {
        event.preventDefault();

        const user = {
            password: this.state.password,
            id: this.state.id
        };

        axios.post( '/sign-in', user )
             .then(result => {
                 if(result.data.success) {
                    const data = result.data.user;
                    const userData = {
                        firstname: data.firstname,
                        lastname: data.lastname,
                        token: data.token,
                        login: data.login,
                        email: data.email,
                        timestamp: new Date().toString(),
                        isComeBack: true
                    };

                    const appData = {
                        userData: userData
                    };

                    localStorage[ 'appData' ] = JSON.stringify( appData );
                    this.props.history.push( '/user/dashboard' );
                 } else {
                    const modal = this.modalRef.current;
                    modal.setState({
                        show: true,
                        title: result.data.title,
                        content: result.data.message
                    });
                 }
             })
             .catch(error => {
                console.log(error);
                const modal = this.modalRef.current;
                modal.setState({
                    show: true,
                    title: 'Error',
                    content: 'Something went wrong'
                });
             });
    }

    // functions to validate the form

    render() {
        return (
            <div className="form">
                <h3 className="text-center">Connect you to your account</h3>

                <form onSubmit={(event) => this.submitForm(event)}>
                    <Input
                        type="text"
                        name="id"
                        textContent="Email or Login"
                        changeValue={this.changeValue}
                    />

                    <Input
                        type="password"
                        name="password"
                        textContent="Password"
                        changeValue={this.changeValue}
                    />

                    <InputSubmit
                        content="Login"
                        submitForm={this.submitForm}
                    />

                    <ErrorModal
                        content=""
                        title=""
                        ref={this.modalRef}
                    />
                </form>
            </div>
        )
    }
}
