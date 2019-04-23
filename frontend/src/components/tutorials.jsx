import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'
import axios from 'axios'

var clieserRestApiHostName = 'https://clieser-restapi.herokuapp.com'

export default class Tutorials extends Component {
    state = {
        tutorialList: []
    }

    renderTutorials = () => {
        var listOfTutorialObjects = this.state.tutorialList
        var rowsWithTutorials = []

        for (var i = 0; i < listOfTutorialObjects.length; i++) {
            var tutorial = listOfTutorialObjects[i]

            rowsWithTutorials.push(
                <div key={i} data-id={tutorial.id} className="blurredElement panelOptions" onClick={this.renderSelectedTutorial}>
                    <img data-id={tutorial.id} src={process.env.PUBLIC_URL + '/imgs/tutorials.png'} alt="tutorials" className="img-fluid imageCentered" />
                    <h4 data-id={tutorial.id} className="alignCenter tutorialH4"> {tutorial.title}</h4>
                </div>
            )
        }
        return rowsWithTutorials
    }

    renderSelectedTutorial = (e) => {
        this.props.history.push("/theory/" + e.target.dataset.id)
    }


    componentDidMount() {
        axios.get(clieserRestApiHostName + '/tutorial')
            .then(response => {
                this.setState({ tutorialList: response.data })
            })
    }

    render() {
        return (
            <div>
                <div><TopContainer standardOpening={false} /></div>
                <div className="fullheight container bottomspace">
                    <h2 className="myh2">Learn what happens behind the scenes</h2>
                    <div className="bottomspace topspace tutorialPanel">
                        {this.renderTutorials()}
                    </div>
                </div>
                <div className="homeFooter"><Footer /></div>
            </div>
        )
    }
} 