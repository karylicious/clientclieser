import React, { Component } from 'react'
import Footer from './footer'
import TopContainer from './topcontainer'

export default class WriteClient extends Component {
    render() {
        return (
            <div>
                <TopContainer standardOpening={false} />
                <div className="fullheight">
                    <h2 className="myh2">Write a Client</h2>
                    <div className="container topspace">
                        <div className="row bottomspace">
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnLeft">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/client1.png'} alt="step" />
                                </div>
                            </div>
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>1. To create a Client that will consume a Web Service, on NetBeans IDE create a new project and select the "Java" option on the "Categories" section and the "Java Application" on the "Projects" section.</p>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>2. Enter a name for the Client project and enter a name of the package along with the name of the main class.</p>
                            </div>
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnRight">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/client2.png'} alt="step" />
                                </div>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnLeft">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/client3.png'} alt="step" />
                                </div>
                            </div>
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>3. Right-click the project node and choose New > Web Service Client. The New Web Service Client wizard will open.</p>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>4. Select Project as the WSDL source (assuming that the Web Service project to be consumed is also open on NetBeans IDE). Click Browse. Browse to the web service to be consumed. When you have selected the web service, click OK.</p>
                            </div>
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnRight">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/client4.png'} alt="step" />
                                </div>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnLeft">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/client5.png'} alt="step" />
                                </div>
                            </div>
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>5. Leave the other settings at default and click Finish.</p>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>6. The Client stubs will be added to the project and the new web service client, will display the available operations on the web service.</p>
                            </div>
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnRight">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/client6.png'} alt="step" />
                                </div>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnLeft">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/client7.png'} alt="step" />
                                </div>
                            </div>
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>7. Open the main class of the Client project and drag any operation of the new web service client under the main() method.</p>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>8. Right-click the project node and choose Run.</p>
                            </div>
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnRight">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/client8.png'} alt="step" />
                                </div>
                            </div>
                        </div>
                        <div className="row bottomspace">
                            <div className="col-sm-5 paddingTopAndBottom">
                                <div className="stepOnLeft">
                                    <img className="stepFig" src={process.env.PUBLIC_URL + '/imgs/client9.png'} alt="step" />
                                </div>
                            </div>
                            <div className="col textMiddleCentered paddingTopAndBottom">
                                <p>9. The Output window will show the output of the dragged operation.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}