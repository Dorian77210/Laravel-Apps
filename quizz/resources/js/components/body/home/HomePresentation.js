import React, { Component } from 'react';

import HomeCard from './HomeCard';
export default class HomePresentation extends Component {

    constructor() {
        super();
        this.state = {
            cards: [
                <HomeCard
                    key={0}
                    containerClass="card text-white bg-dark mb-3"
                    headerContent="Create as much quizz as you want !"
                    bodyContent="You can create a lot of quizz without any limit and for free !"
                    />,
                <HomeCard
                    key={1}
                    containerClass="card text-white bg-dark mb-3"
                    headerContent="Easy accessibility"
                    bodyContent="Create, update and share your quizz when you want and very easily !"
                />,
                <HomeCard
                    key={2}
                    containerClass="card text-white bg-dark mb-3"
                    headerContent="Statistics available"
                    bodyContent="When persons participate at your quizz, you could see a lot of statistics according to them !"
                />
            ],
        };
    }
    render() {
        return (
            <div className="row">
                {this.state.cards.map( (card, index) => {
                    return <div className="col-4" key={index + 4}>{card}</div>
                })}
            </div>
        );
    }
}
