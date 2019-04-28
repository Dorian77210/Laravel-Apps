import React, { Component } from 'react';

import HomePresentation from './home/HomePresentation';
import Chart from './home/ChartExample';
import ParticipationChartExample from './home/ParticipationChartExample';

export default class IndexBody extends Component {

    render() {
        return (
            <div className="home">
                <br/>
                <HomePresentation />
                <br/>
                <Chart />
                <br/>
                <ParticipationChartExample />
                <br />
                <br />
            </div>
        )
    }
}
