import React, { Component } from 'react';

import ErrorModal from '../../modal/ErrorModal';

import axios from 'axios';

export default class UserHome extends Component {

    constructor() {
        super();
        this.modalRef = React.createRef();
    }

    componentWillMount() {
        axios.get('/user/quizzes/' )
            .then(result => {
                const response = result.data;
                if(response.hasError) {
                    this.props.history.push( '/error' );
                } else {
                    // retrieve the quizzes
                }
            })
            .catch(error => {
                this.props.history.push('/error');
            });
    }
    render() {
        return (
            <div>Welcome to your home



                {/*Error modal */}
                <ErrorModal
                    content=""
                    title=""
                    ref={this.modalRef}
                />
            </div>
        )
    }
}
