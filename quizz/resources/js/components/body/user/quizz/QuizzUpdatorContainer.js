import React, { Component } from 'react';

import ErrorModal from '../../../modal/ErrorModal';

import QuizzInformationUpdator from './QuizzInformationUpdator';

import axios from 'axios';

export default class QuizzUpdatorContainer extends Component {

    constructor(props) {
        super(props);
        const quizzID = this.props.match.params.quizzID;
        const storage = JSON.parse( localStorage[ 'appData' ] );
        const login = storage.userData.login;

        this.state = {
            loading: true
        };

        this.modalRef = React.createRef();
    }

    componentWillMount() {
        const quizzID = this.props.match.params.quizzID;
        const storage = JSON.parse( localStorage[ 'appData' ] );
        const login = storage.userData.login;

        this.setState( {
            loading: true
        } );

        axios.get( '/user/' + login + '/quizzes/' + quizzID )
             .then( res => {
                 const data = res.data;
                 if( data.success ) {
                     const quizz = data.quizz;
                     this.setState( {
                        quizz: quizz,
                        loading: false
                     } );
                 } else {
                     this.props.history.push( '/error' );
                 }
             })
             .catch( error => {
                const modal = this.modalRef.current;
                modal.setState( {
                    title: 'Something was wrong',
                    content: 'Error when retrieving your quizz. Please reload your browser.',
                    show: true
                } );
             });
    }

    render() {
        return (
            <div>
                {
                    !this.state.loading && <QuizzInformationUpdator quizz={this.state.quizz.data} />
                }
                <ErrorModal
                    title=""
                    content=""
                    ref={this.modalRef}
                />
            </div>
        )
    }
}
