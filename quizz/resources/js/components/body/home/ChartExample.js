import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import './../../css/home.css';

export default class ChartExample extends Component {

    constructor() {
        super();
        // options of the chart
        this.state = {
            data: {
                labels: [
                    'Cat', 'Dog', 'Turtle'
                ],
                datasets: [{
                    data: [25, 55, 20],
                    backgroundColor: [
                        '#99a0c5', '#ae7d99', '#df7970'
                    ],
                    hoverBackgroundColor: [
                        '#99a0c5', '#ae7d99', '#df7970'
                    ]
                }]
            }
        }
    }

    render() {
        return (
            <div className="row bg-dark text-white">
                <div className="vertical-center col-4 align-self-center">
                    Show for each question the percentage of each response in a beautiful graph !
                </div>

                <div className="col-8 border-left border-white">
                    <h2 className="text-center">What is your favorite pet ?</h2>
                    <Pie data={this.state.data} />
                    <br />
                </div>
            </div>
        )
    }
}
