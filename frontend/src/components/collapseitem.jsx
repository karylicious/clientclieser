import React, { Component } from 'react'

export default class CollapseItem extends Component {

    getDetails = (e) => {
        var elements = document.getElementsByClassName("myCollapseActive")
        if (elements.length === 1) {
            if (elements[0].dataset.id === e.target.dataset.id)
                return
            elements[0].classList.remove("myCollapseActive")
        }

        e.target.className += " myCollapseActive"
        this.props.getItemByID(e.target.dataset.id)
    }

    render() {
        return (
            <div className="myCollapse" data-id={this.props.id} onClick={this.getDetails}>
                {this.props.name}
            </div>
        )
    }
} 