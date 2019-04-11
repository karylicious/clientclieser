import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'

export default class WriteClient extends Component {
    render() {
        return (
            <div>
                <div><TopContainer standardOpening={false} /></div>
                <div className="fullheight">
                    <h2 className="myh2">Write a Client</h2>
                    <div className="container topspace">
                        <div className="row bottomspace">
                            <div className="col-sm-5">
                                <div className="stepOnLeft">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/s-1.png'} />
                                </div>
                            </div>
                            <div className="col textMiddleCentered">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta, leo in tristique egestas, ipsum orci gravida libero, ac tempus lectus ex vitae nisl. Sed dignissim enim fringilla tellus ornare, mollis efficitur magna iaculis. Vestibulum pretium risus nulla, vitae venenatis nunc facilisis non. Phasellus purus lectus, volutpat pulvinar tortor et, bibendum commodo libero.</p>
                            </div>
                        </div>

                        <div className="row bottomspace">
                            <div className="col textMiddleCentered">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta, leo in tristique egestas, ipsum orci gravida libero, ac tempus lectus ex vitae nisl. Sed dignissim enim fringilla tellus ornare, mollis efficitur magna iaculis. Vestibulum pretium risus nulla, vitae venenatis nunc facilisis non. Phasellus purus lectus, volutpat pulvinar tortor et, bibendum commodo libero.</p>
                            </div>
                            <div className="col-sm-5">
                                <div className="stepOnRight">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/s-1.png'} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="otherFooter"><Footer /></div>
            </div>
        )
    }
}