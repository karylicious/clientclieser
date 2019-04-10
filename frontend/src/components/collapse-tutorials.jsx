import React, { Component } from 'react'
import CollapseItem from './collapseitem'

export default class Collapse extends Component {
    getTutorialByID = (id) => {
        this.props.getTutorialByID(id)
    }

    render() {
        var rowsWithItems = []
        var listOfObjs = this.props.tutorialList

        for (var i = 0; i < listOfObjs.length; i++) {
            var tutorial = listOfObjs[i]
            rowsWithItems.push(<CollapseItem key={i}
                id={tutorial.id}
                name={tutorial.title}
                getItemByID={this.getTutorialByID} />)

        }

        if (rowsWithItems.length === 0)
            rowsWithItems.push(<div key={0} className="noItem">There is no tutorial</div>)


        return (
            <div id="accordion">
                <div className="collapseHeader">
                    List of Tutorials
                </div>
                <div className="card">
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body cardbody">
                            {rowsWithItems}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}