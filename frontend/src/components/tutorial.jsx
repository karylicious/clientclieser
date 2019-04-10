import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'
import axios from 'axios'

export default class Tutorials extends Component {
    state = {
        lessonList: [],
        tutorialTitle: ''
    }


    handleLessonListener = (e) => {
        var path = process.env.PUBLIC_URL + '/imgs/checkmark.png'
        document.getElementById("lesson-img-" + e.target.dataset.id).src = path
        window.open(e.target.dataset.link)
    }

    handleReturnButton = () => {
        this.props.history.push("/tutorials")
    }

    renderLessons = () => {
        var listOfLessonObjects = this.state.lessonList
        var rowsWithLessons = []
        for (var i = 0; i < listOfLessonObjects.length; i++) {
            var lesson = listOfLessonObjects[i]
            rowsWithLessons.push(
                <div key={i} data-id={i} data-link={lesson.link} className="effectShadow" onClick={this.handleLessonListener}>
                    <div className="container lessonsDiv" data-id={i} data-link={lesson.link}>
                        <div className="row" data-id={i} data-link={lesson.link}>
                            <div className="col-sm-3 lessonTag" data-id={i} data-link={lesson.link}>{(i + 1)}</div>
                        </div>

                        <div className="lessonBody" data-id={i} data-link={lesson.link} >
                            {lesson.title}
                        </div>
                        <div className="lessonFooter textright" data-id={i} data-link={lesson.link}>
                            <img id={"lesson-img-" + i} data-id={i} data-link={lesson.link} src={process.env.PUBLIC_URL + '/imgs/lock.png'} alt="lock" width="20px" height="20px" />
                        </div>
                    </div>
                </div>
            )
        }
        return rowsWithLessons
    }

    componentDidMount() {
        const { tutorialid } = this.props.match.params
        axios.get('http://localhost:5000/lesson?tutorialid=' + tutorialid)
            .then(response => {
                this.setState({ lessonList: response.data })
                axios.get('http://localhost:5000/tutorial?tutorialid=' + tutorialid)
                    .then(response => {
                        this.setState({ tutorialTitle: response.data['title'] })
                    })
            })
    }

    render() {
        return (
            <div>
                <div><TopContainer standardOpening={false} /></div>
                <div className="fullheight container bottomspace">
                    <h2 className="myh2">Learn what happens behind the scene</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 paddingLeft0"><h4>{this.state.tutorialTitle}</h4><hr className="myhr" /></div>
                        </div>
                        <div className="bottomspace tutorialPanel">
                            {this.renderLessons()}
                        </div>
                    </div>

                    <div className="textright">
                        <button className="mybtn" onClick={this.handleReturnButton}>Return</button>
                    </div>
                </div>
                <div className="homeFooter"><Footer /></div>
            </div>
        )
    }
} 