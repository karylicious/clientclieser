import React, { Component } from 'react'

export default class Lesson extends Component {
    handleRemoveLesson = (e) => {
        var lessonID = e.target.id
        lessonID = lessonID.split("-")

        var listOfLessonObjects = this.getCurrentSiblingsContent(lessonID[1])
        this.props.removeLesson(listOfLessonObjects)
    }

    getCurrentSiblingsContent(lessonToBeRemovedID) {
        var listTitle = document.getElementsByClassName("lessontitle")
        var listDescr = document.getElementsByClassName("lessondescription")
        var listLink = document.getElementsByClassName("lessonlink")
        var listOfLessonObjects = []

        for (var i = 0; i < listTitle.length; i++) {
            if (listTitle[i].id !== "title-" + lessonToBeRemovedID) {
                listOfLessonObjects.push({
                    title: listTitle[i].value,
                    description: listDescr[i].value,
                    link: listLink[i].value
                })
            }
        }
        return listOfLessonObjects
    }

    componentDidUpdate() {
        document.getElementById("title-" + this.props.id).value = this.props.title
        document.getElementById("descr-" + this.props.id).value = this.props.description
        document.getElementById("link-" + this.props.id).value = this.props.link
    }

    render() {
        return (
            <div className="effectShadow bottomspace padding20">
                <div className="row">
                    <div className="col">
                        <p><strong>Lesson {this.props.id + 1}</strong></p>
                        <label>Title</label>
                        <input className="form-control myinputtext lessontitle lesson" id={"title-" + this.props.id} type="text" defaultValue={this.props.title} />
                    </div>
                </div>
                <div className="row bottomspace">
                    <div className="col">
                        <label>Description</label>
                        <textarea className="form-control lessondescription lesson" id={"descr-" + this.props.id} rows="6" defaultValue={this.props.description}></textarea>
                    </div>
                </div>
                <div className="row bottomspace">
                    <div className="col">
                        <label>BlackBoard Resource Link</label>
                        <input className="form-control myinputtext lessonlink lesson" id={"link-" + this.props.id} type="text" defaultValue={this.props.link} />
                    </div>
                </div>
                <div className="row alignRight">
                    <button className="btn btn-outline-secondary" id={"removeLesson-" + this.props.id} type="button" onClick={this.handleRemoveLesson}>Remove</button>
                </div>
            </div>
        )
    }
} 