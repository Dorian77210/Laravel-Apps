import React, { Component } from 'react';

import { Table, Button } from 'react-bootstrap';
import css from '../../css/hover.css';

import axios from 'axios';
import PropTypes from 'prop-types';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync, faCheck, faTimes, faShare } from '@fortawesome/free-solid-svg-icons'

library.add(faSync, faCheck, faTimes, faShare);

class QuizzesContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizzes: this.props.quizzes
        };
    }

    render() {
        return (
            <div>
                {!this.state.quizzes.length ? <div className="text-center"><br/><br/>No quizz found</div> :
                    <Table responsive className="text-center">
                        <thead>
                            <tr className="border-bottom border-black">
                                <th>Name</th>
                                <th>Is private ?</th>
                                <th>Is active ?</th>
                                <th>Created at</th>
                                <th>Update</th>
                                <th>Access to the quizz</th>
                            </tr>

                        </thead>

                        <tbody>
                            {
                                this.state.quizzes.map(quizz => {
                                    return <tr key={quizz.quizz_ID} className="border-bottom border-black">
                                        <th>{quizz.title}</th>
                                        <th><FontAwesomeIcon icon={quizz.is_private ? "check" : "times"} color={quizz.is_private ? "green" : "red"} /></th>
                                        <th><FontAwesomeIcon icon={quizz.is_active ? "check" : "times"} color={quizz.is_active ? "green" : "red"} /></th>
                                        <th>{quizz.created_at}</th>
                                        <th><span onClick={event => this.props.goTo(event, '/user/quizzes/update/' + quizz.quizz_ID)}>
                                            <FontAwesomeIcon icon="sync" className="text-center icon-hover" color="#52E819" /></span></th>
                                        <th>
                                            <span onClick={(event) => this.props.goTo(event, '/user/quizzes/' + quizz.quizz_ID)}>
                                                {quizz.is_active ? <FontAwesomeIcon icon="share" className="text-center icon-hover" />
                                                    : <FontAwesomeIcon icon="times" color="red" />}
                                            </span>
                                        </th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                }

                <div className="float-right">
                    <Button
                        variant="outline-primary"
                        onClick={(event) => this.props.goTo(event, '/user/quizzes/create')}>
                        Create quizz
                    </Button>
                </div>
            </div>
        )
    }
}

QuizzesContainer.propTypes = {
    goTo: PropTypes.func
};

export default QuizzesContainer;
