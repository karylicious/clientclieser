import React, { Component } from 'react'

class CollapseItem extends Component {

    getDetails = (e) => {
        var elements = document.getElementsByClassName("collapseExerciseActive")
        if (elements.length == 1) {
            if (elements[0].dataset.id == e.target.dataset.id)
                return
            elements[0].classList.remove("collapseExerciseActive")
        }

        e.target.className += " collapseExerciseActive"
        this.props.getQuestions(e.target.dataset.id, e.target.dataset.file, e.target.dataset.name, e.target.dataset.type)
    }

    render() {
        return (
            <div className="collapseExercise" data-id={this.props.id} data-file={this.props.file} data-name={this.props.name} data-type={this.props.type} onClick={this.getDetails}>
                {this.props.name}
            </div>
        )
    }
}
export default CollapseItem