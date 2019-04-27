import React, { Component } from 'react';

import { css } from '@emotion/core';
import { ClimbingBoxLoader } from 'react-spinners';

import axios from 'axios';

import Input from '../form/Input';
import InputSubmit from '../form/InputSubmit';
import ErrorModal from '../modal/ErrorModal';

const override = css`
display: block;
position: absolute;
z-index: 2333;
margin: 0 auto;
top: 40vh;
`;


export default class SignUpBody extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

        this.modalRef = React.createRef();

        this.changeValue = this.changeValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this._areValidPasswords = this._areValidPasswords.bind(this);
    }

    // function to change the value of an input
    changeValue(key, event) {
        const value = event.target.value;
        this.setState({
            [key]: value
        });
    }

    submitForm(event) {
        event.preventDefault();
        const modal = this.modalRef.current;

        if (!this._areValidPasswords()) {
            modal.setState({
                show: true,
                content: "The passwords don't match or they are empty",
                title: 'Error during the confirmation of the account'
            });

            return false;
        }

        const user = {
            password: this.state.password,
            login: this.state.login,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        this.setState({ loading: true });
        axios.post('/sign-up', user)
            .then(res => {
                console.log(res);
                this.setState({ loading: false });
                modal.setState({
                    show: true,
                    content: res.data.message,
                    title: res.data.title
                });
            })
            .catch(error => {
                alert('ok');
                console.log(error);

                this.setState({ loading: false });
            });
    }

    _areValidPasswords() {
        const password = this.state.password;
        const confirmationPassword = this.state.confirmationPassword;

        if ((password.trim() == "") || (confirmationPassword.trim() == "")) return false;
        return password === confirmationPassword;
    }

    render() {
        return (
            <div className="form">
                <ClimbingBoxLoader
                    css={override}
                    sizeUnit={"px"}
                    size={15}
                    color={'#123abc'}
                    loading={this.state.loading}
                />

                <h3 className="text-center">Create your account now ! You will able to create quizz and to have other features !</h3>

                <form onSubmit={(event) => this.submitForm(event)}>
                    <Input
                        type="email"
                        textContent="Email"
                        changeValue={this.changeValue}
                        name="email"
                    />

                    <Input
                        type="text"
                        textContent="Login"
                        changeValue={this.changeValue}
                        name="login"
                    />

                    <Input
                        type="text"
                        textContent="First Name"
                        changeValue={this.changeValue}
                        name="firstName"
                    />

                    <Input
                        type="text"
                        textContent="Last name"
                        changeValue={this.changeValue}
                        name="lastName"
                    />

                    <Input
                        type="password"
                        textContent="Password"
                        changeValue={this.changeValue}
                        name="password"
                    />

                    <Input
                        type="password"
                        textContent="Confirmation password"
                        changeValue={this.changeValue}
                        name="confirmationPassword"
                    />

                    <InputSubmit
                        content="Create account"
                        submitForm={this.submitForm}
                    />

                    {/*Error modal */}
                    <ErrorModal
                        content=""
                        title=""
                        ref={this.modalRef}
                    />
                </form>
            </div>
        );
    }
}
