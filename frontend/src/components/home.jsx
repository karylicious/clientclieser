import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'

class Home extends Component {
    redirectToTutorials = () => {
        this.props.history.push("/tutorials");
    }

    render() {
        return (
            <div>
                <div><TopContainer standardOpening={true} /> </div>
                <div>
                    <div className="row">
                        <div className="col">
                            <h2 className="myh2">Welcome to Clieser</h2>
                        </div>
                    </div>
                    <div className="darkRow">
                        <div className="row darRowCol">
                            <div className="col-small-4 p70">
                                Clieser is a system designed to learn client server architecture concepts.<br />
                                Here you can learn, build and test your own client server system
                        </div>
                            <div className="col-small-4">
                                <div className="communicationImg">
                                    <img src={process.env.PUBLIC_URL + '/imgs/communication.png'} alt="thin-client" width="200px" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="featuresRow">
                        <div className="row">
                            <div className="col textCentered"><h3 className="featuresHeadings">Features</h3></div>
                        </div>
                        <div className="row alignLeft">
                            <div className="col-sm-2 alignCenter">
                                <img src={process.env.PUBLIC_URL + '/imgs/tutorials.png'} alt="tutorials" className="img-fluid featuresImages" />
                            </div>
                            <div className="col-sm-4">
                                <h4 className="featuresSubHeadings">Tutorials</h4>
                                <p>A great range of lessons that clarify all concepts about client server architecture</p>
                            </div>
                            <div className="col-sm-2 alignCenter">
                                <img src={process.env.PUBLIC_URL + '/imgs/clientserver.png'} alt="clientserver" className="img-fluid featuresImages" />
                            </div>
                            <div className="col-sm-4">
                                <h4 className="featuresSubHeadings">Development of Client Server System</h4>
                                <p>With a few step you can learn how to build a client server system</p>
                            </div>
                        </div>
                        <div className="row alignLeft">
                            <div className="col-sm-2 alignCenter">
                                <img src={process.env.PUBLIC_URL + '/imgs/validation.png'} alt="validation" className="img-fluid featuresImages" />
                            </div>
                            <div className="col-sm-4">
                                <h4 className="featuresSubHeadings">System Validation</h4>
                                <p>You can validate your Client and Server components with our validator</p>
                            </div>
                            <div className="col-sm-2 alignCenter">
                                <img src={process.env.PUBLIC_URL + '/imgs/exercises.png'} alt="exercises" className="img-fluid featuresImages" />
                            </div>
                            <div className="col-sm-4">
                                <h4 className="featuresSubHeadings">Excercises</h4>
                                <p>Simple exercises that will challenge you to the development of client server system</p>
                            </div>
                        </div>
                        <div>
                            <p className="buttoncentered" id="getStarted"><button className="btngetstarted" onClick={this.redirectToTutorials}>Get Started</button> </p>
                        </div>

                    </div>
                </div>
                <div className="homeFooter"><Footer /></div>
            </div>
        );
    }
}
export default Home