import React, { Component } from 'react'

export default class TestResult extends Component {

    togglePanel(e) {
        var panelID = e.target.id.split("-")
        var panel = document.getElementById('panel-' + panelID[1])
        panel.classList.toggle('details-content-visible')
    }

    render() {

        const rowWithDetails = [], rowWithFinalResult = []

        var passedTest = true
        var found = false

        for (var i = 0; i < this.props.resultsList.length; i++) {
            if (found === false && this.props.projectOwner === this.props.resultsList[i]['projectOwner'])
                found = true

            if (found === true && this.props.projectOwner !== this.props.resultsList[i]['projectOwner'])
                break

            if (found === true) {
                if (this.props.resultsList[i]['hasPassed'] === "false")
                    passedTest = false

                var image = (this.props.resultsList[i]['hasPassed'] === 'true') ? 'check' : 'error'

                rowWithDetails.push(
                    <div key={i} className="row">
                        <div className="col">
                            <p>
                                <img src={process.env.PUBLIC_URL + '/imgs/' + image + '.png'} alt="res" />
                                {this.props.resultsList[i]['title']}
                            </p>
                            <hr className="resultline" />
                        </div>
                    </div>
                )
            }
        }

        const result = (passedTest === true) ? 'check' : 'error'
        rowWithFinalResult.push(
            <div key={this.props.resultID} className="row">
                <div className="col">
                    <p className={(passedTest === true) ? 'psuccess' : 'pfailed'}>The project {this.props.projectOwner} {(passedTest === true) ? 'passed' : 'failed'} the test</p>
                </div>
            </div>
        )

        return (
            <div className="row">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p>{this.props.projectOwner}
                                <br />
                                <span className="vDetails" onClick={this.togglePanel} id={'details-' + this.props.resultID} >View Details</span>
                                <img src={process.env.PUBLIC_URL + '/imgs/' + result + '.png'} alt="res" className="imageright" />
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="container details-content" id={'panel-' + this.props.resultID}>
                            {rowWithDetails}
                            {rowWithFinalResult}
                        </div>
                    </div>
                    <hr className="resultline" />
                </div>
            </div>
        )
    }
} 