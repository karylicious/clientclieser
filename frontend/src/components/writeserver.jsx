import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'

export default class WriteServer extends Component {
    render() {
        return (
            <div>
                <TopContainer standardOpening={false} />
                <div className="fullheight">
                    <h2 className="myh2">Write a Server</h2>
                    <div className="container topspace">
                        <div className="row bottomspace">
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnLeft">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/server1.PNG'} alt="step" />
                                </div>
                            </div>
                            <div className="col textMiddleCentered">
                                <p>1. To create a server as Web Service, on NetBeans IDE create a new project and select the "Java Web" option on the "Categories" section and the "Web Application" on the "Projects" section.</p>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col textMiddleCentered">
                                <p>2. Enter a name for the Server project.</p>
                            </div>
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnRight">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/server2.PNG'} alt="step" />
                                </div>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnLeft">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/server3.PNG'} alt="step" />
                                </div>
                            </div>
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>3. Select GlassFish Server as the server where your web service will be deployed. Then click Finish.</p>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>4. Right-click the project node and choose New > Web Service.</p>
                            </div>
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnRight">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/server5.png'} alt="step" />
                                </div>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnLeft">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/server6.PNG'} alt="step" />
                                </div>
                            </div>
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>5. Name the web service and enter a name for the package. Leave Create Web Service from Scratch selected. Click Finish. </p>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>6. From this point you can add new methods on the new web service class. After adding new methods, right-click the project node and choose Deploy. The IDE starts the GlassFish server, builds your web service application, and deploys it to the GlassFish server. You can follow the progress of these operations in the Output view of NetBeans IDE.</p>
                            </div>
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnRight">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/server7.png'} alt="step" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}