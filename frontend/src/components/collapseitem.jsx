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
        this.props.getExerciseByID(e.target.dataset.id)//,
        //e.target.dataset.file,
        //e.target.dataset.name,
        //e.target.dataset.type,
        //e.target.dataset.expectedcliententrypoint,
        //e.target.dataset.description)
    }

    render() {
        return (
            <div className="collapseExercise"
                data-id={this.props.id}
                //data-file={this.props.file}
                //data-name={this.props.name}
                //data-type={this.props.type}
                //data-description={this.props.description}
                //data-expectedcliententrypoint={this.props.expectedClientEntryPoint}
                onClick={this.getDetails}>

                {this.props.name}
            </div>
        )
    }
}
export default CollapseItem