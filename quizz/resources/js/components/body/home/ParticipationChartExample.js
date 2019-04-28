import React, { Component } from 'react';
import Chart from 'react-apexcharts'

export default class ParticipationChartExample extends Component {

    constructor() {
        super();
        this.state = {
            options: {
              chart: {
                id: 'apexchart-example'
              },
              dataLabels: {
                enabled: true
              },
              xaxis: {
                categories: [ 'January', 'February', 'March', 'April' ]
              }
            },
            series: [{
              name: 'series-1',
              data: [30, 40, 45, 50]
            }]
          }
    }

    render() {
        return (
            <div className="row bg-dark text-white">
                <div className="col-8 border-right border-white" style={{padding: '5%'}}>
                <Chart className="bg-white" options={this.state.options} series={this.state.series} type="bar" width={'100%'} height={'auto'} />
                </div>

                <div className="vertical-center col-4 align-self-center">
                    Show the number of participation for your quizz and for each month !
                </div>
                <br />
                <br />
                <br />
            </div>
        );
    }
}
