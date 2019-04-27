import React, { Component } from 'react';

export default class HomeCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.containerClass}>
                <div className="card-header text-center">
                    { this.props.headerContent }
                </div>

                <div className="card-body">
                    <div className="card-text">
                        { this.props.bodyContent }
                    </div>
                </div>
            </div>
        );
    }
}
