import React, { Component } from 'react'
export default class GradingResult extends Component {

    togglePanel(e) {
        var panelID = e.target.id.split("-")
        var panel = document.getElementById('panel-' + panelID[1])
        panel.classList.toggle('details-content-visible')
    }

    render() {
        const rowWithDetails = []
        var found = false

        for (var i = 0; i < this.props.resultsList.length; i++) {
            if (found === false && this.props.projectOwner === this.props.resultsList[i]['projectOwner'])
                found = true

            if (found === true && this.props.projectOwner !== this.props.resultsList[i]['projectOwner'])
                break

            if (found === true) {
                var image = (this.props.resultsList[i]['hasPassed'] === 'true') ? 'check' : 'error'
                rowWithDetails.push(
                    <div key={i} className="row">
                        <div className="col">
                            <p>
                                <img src={process.env.PUBLIC_URL + '/imgs/' + image + '.png'} alt="res" />
                                {this.props.resultsList[i]['title']}
                            </p>
                            <p className="textright">Actual Output: {this.props.resultsList[i]['actualTestOutput']}</p>
                            <p className="textright">Score: {this.props.resultsList[i]['grade']}</p>
                            <hr className="resultline" />
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="row">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p>{this.props.projectOwner}</p>
                            <p className="textright">Final Grade</p>
                            <p>
                                <span className="vDetails" onClick={this.togglePanel} id={'details-' + this.props.resId} >View Details</span>
                                <span className="imageright">{this.props.finalGrade}</span>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="container details-content" id={'panel-' + this.props.resId}>
                            {rowWithDetails}
                        </div>
                    </div>
                    <hr className="resultline" />
                </div>
            </div>
        )
    }
} 