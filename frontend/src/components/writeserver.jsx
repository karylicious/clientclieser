import React, { Component } from 'react'
import Footer from './footer'

class WriteServer extends Component {

    componentDidMount() {
        var mainContainer = document.getElementById('main')
        mainContainer.style.display = "block"
        mainContainer.classList.remove("main")

        var row = document.getElementById('openingTestRow')
        row.style.display = "none"

        var topLogo = document.getElementById('toplogo')
        topLogo.style.display = "block"
    }

    renderBlurredElement(text, classes) {
        return (
            <div className={classes}>
                <div className="col-sm-6">
                    <div className="blurredElement dpadding">
                        {text}
                    </div>
                </div>
            </div>
        )
    }

    renderSubHeddings(classes, text) {
        return (
            <div className="row bottomspace">
                <div className={classes}>
                    <h5>{text}</h5>
                </div>
            </div>
        )
    }

    renderStep(number, rowClasses, colClasses, text) {
        return (
            <div className={rowClasses}>
                <div className="col-sm-0 numberStep">
                    <strong >{number}</strong>
                </div>
                <div className={colClasses}>
                    <p>{text}</p>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="fullheight">
                    <h2 className="myh2">Write a Server</h2>
                    <div className="topspace">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="blurredElement dpadding">
                                    The Java EE platform includes Java API for XML Web Services (JAX-WS), which simplifies the web services development using Java technology. Here you will learn how to implement a <strong>SOAP web service</strong> using <strong>JAX-WS API</strong>.
                                </div>
                            </div>
                        </div>
                        {this.renderBlurredElement("For the creation of web service, you will first define an interface that declares all the methods to be exposed as a Web Service, and its implementation that define those methods.", "row alignRight bottomspace")}
                        <div className="redRow">
                            {this.renderSubHeddings("col-sm-14 redSubHeading", "To write a Web Service")}

                            <div className="row">
                                <div className="container">
                                    {this.renderStep("1", "row bottomspace", "col-sm-5 redStep", "In the NetBeans IDE, create an empty Java application project")}
                                    {this.renderStep("2", "row StepCentered bottomspace", "col-sm-5 redStep", 'Add new Java package named "com"')}
                                    {this.renderStep("3", "row  bottomspace", "col-sm-5 redStep", 'Add a new Java package named "example" under the previous package')}
                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >4</strong>
                                        </div>
                                        <div className="col-sm-5 redStep">
                                            <p>
                                                Add a new Java interface (under the example package) name it "CalculatorWs"
                                            </p>
                                        </div>

                                        <div className="col-sm-6">
                                            <p className="italicFont pCode">
                                                The CalculatorWs will the defined as the Service Endpoint interface (SEI). A service endpoint interface is a Java interface that declares the methods that a client can invoke on the service.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >5</strong>
                                        </div>
                                        <div className="col-sm-5 redStep">
                                            <p>
                                                In the CalculatorWs interface import the WebMethod and WebService interfaces by adding the following code:
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="italicFont pCode">
                                                import javax.jws.WebService;<br />
                                                import javax.jws.WebMethod;
                                            </p>
                                        </div>
                                    </div>
                                    {this.renderStep("6", "row StepCentered bottomspace", "col-sm-5 redStep", 'Add the "@WebService" annotation before the line "public interface CalculatorWs". The @WebService annotation marks this interface as defining a web service interface.')}
                                    {this.renderStep("7", "row bottomspace", "col-sm-5 redStep", 'Add "public int multiply (int a, int b)" method')}
                                    {this.renderStep("8", "row StepCentered bottomspace", "col-sm-5 redStep", 'Add the "@WebMethod" annotation before the added method. The @WebMethod annotation marks a method as to be exposed as a web service operation.')}
                                    {this.renderStep("9", "row bottomspace", "col-sm-5 redStep", 'Add a new Java class(under the "example" package) name it "CalculatorService"')}
                                    <div className="row StepCentered bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >10</strong>
                                        </div>
                                        <div className="col-sm-9 redStep"><p>In the CalculatorService class import the WebService interface by adding the following code: <br /><span className="italicFont">import javax.jws.WebService;</span></p></div>
                                    </div>
                                    {this.renderStep("11", "row bottomspace", "col-sm-5 redStep", 'Add the "implements CalculatorWs"')}
                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >12</strong>
                                        </div>
                                        <div className="col-sm-5 redStep">
                                            <p>
                                                Define the <span className="italicFont">multiply</span> method by adding the following code:
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="italicFont pCode">
                                                @Override<br />
                                                public int multiply ( int a, int b ) {"{"}<br />
                                                return a * b;<br />
                                                {"}"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >13</strong>
                                        </div>
                                        <div className="col-sm-5 redStep">
                                            <p>
                                                Before the line public class CalculatorService implements CalculatorWs, add the following code:
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="italicFont pCode">
                                                @WebService (<br />
                                                portName = "CalculatorPort",<br />
                                                serviceName = "CalculatorService",<br />
                                                endpointInterface = "com.example.CalculatorWs" )
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row bottomspace">
                                        <p>
                                            All the parameters in the @WebService annotation define how the client will consume the service through the WSDL. Note that the endpointInterface parameter defines that the WSDL has to be generated based on the interface it implements.
                                        </p>
                                    </div>
                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >14</strong>
                                        </div>
                                        <div className="col-sm-5 redStep">
                                            <p>
                                                In the CalculatorWs interface import the WebMethod and WebService interfaces by adding the following code:
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="italicFont pCode">
                                                import javax.jws.WebService;<br />
                                                import javax.jws.WebMethod;
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >15</strong>
                                        </div>
                                        <div className="col-sm-5 redStep">
                                            <p>
                                                In the CalculatorWs interface import the WebMethod and WebService interfaces by adding the following code:
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="italicFont pCode">
                                                import javax.xml.ws.Endpoint;
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >16</strong>
                                        </div>
                                        <div className="col-sm-5 redStep">
                                            <p>
                                                Add the <span className="italicFont">main</span> method and in its body add the following code and run the program:
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="italicFont pCode">
                                                Endpoint.publish ( "http://localhost:8910/calculatorservice/calculator", new CalculatorService() );
                                            </p>
                                        </div>
                                    </div>
                                    {this.renderStep("17", "row StepCentered bottomspace", "col-sm-5 redStep", 'Now visit the URL http://localhost:8910/calculatorservice/calculator?wsdl to access the generated WSDL.')}
                                </div>
                            </div>
                        </div>
                        {this.renderBlurredElement("The Web service endpoint is used to publish a web service under a specific URL, so that clients can access it. In this example clients will connect to the calculator Web Service's endpoint at the URL http://localhost:8910/calculatorservice/calculator, which is where the calculator service is running. The calculator web service runs over HTTP on port 8910 of your computer.", "row topspace")}
                        {this.renderBlurredElement("When you run this program, the Web Service is not deployed anywhere. The JVM creates a JAX-WS runtime environment, publishes the Web Service and open the socket (on a provided IP address and port) for clients to consume it.", "row alignRight bottomspace")}
                    </div>
                    <div className="otherFooter"><Footer /></div>
                </div>
            </div>
        );
    }
}
export default WriteServer