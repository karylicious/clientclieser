import React, { Component } from 'react'
import Footer from './footer'

class WriteClient extends Component {

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
                    <h2 className="myh2">Write a Client</h2>
                    <div className="topspace">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="blurredElement dpadding">
                                    When you write your own client you have to write the client support code which take care of including the qualified name and URL, so that your client can consume a published web service. But <strong>Java</strong> provides a way to generate web service client support code using the <strong>wsimport command</strong>.
                                </div>
                            </div>
                        </div>
                        {this.renderBlurredElement("The wsimport tool is part of the JDK and it is available under JDK_PATH/bin directory. This tool parse WSDL files and generate the necessary client files (stubs) to consume a web service. Among others files that it might generate, it generates  the web service interface and the web service implementation files.", "row alignRight bottomspace")}

                        <div className="redRow">
                            {this.renderSubHeddings("col-sm-14 redSubHeading", "Before start writing the Client")}

                            <div className="row">
                                <div className="container">
                                    {this.renderStep("1", "row bottomspace", "col-sm-5 redStep", "Localize and copy the path of the JDK/bin directory")}
                                    {this.renderStep("2", "row StepCentered bottomspace", "col-sm-5 redStep", "Open the command prompt")}

                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >3</strong>
                                        </div>
                                        <div className="col-sm-5 redStep"><p>Type in the command prompt: <br />set path=<span className="italicFont">the copied path</span></p></div>
                                    </div>
                                    {this.renderStep("4", "row StepCentered bottomspace", "col-sm-5 redStep", "Access the web service's WSDL in the browser and copy its URL")}

                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >5</strong>
                                        </div>
                                        <div className="col-sm-9 redStep"><p>In the same command prompt enter the following: <br />wsimport –keep http://www.examplewebservice.com/servicename?wsdl –s  enter the directory path where you want to keep the generated source files</p></div>
                                    </div>
                                    {this.renderStep("6", "row StepCentered bottomspace", "col-sm-5 redStep", "Close the command prompt")}

                                </div>
                            </div>
                        </div>
                        {this.renderBlurredElement("Now that you have the generated web service client stubs, you can start writing your Client to consume the web service.", "row topspace")}
                        {this.renderBlurredElement("For example, you can write a Client that consumes a web service that provide a calculator.", "row alignRight bottomspace")}

                        <div className="darkRowStep topspace">
                            {this.renderSubHeddings("col-sm-14 darkSubHeading", "After generating the Client stubs")}

                            <div className="row">
                                <div className="container">
                                    {this.renderStep("1", "row bottomspace", "col-sm-5 darkStep", "In the NetBeans IDE, create an empty Java Application project")}
                                    {this.renderStep("2", "row StepCentered bottomspace", "col-sm-5 darkStep", 'Add a new Java package named "com"')}
                                    {this.renderStep("3", "row bottomspace", "col-sm-5 darkStep", 'Add a new Java package named "example" under the previous package')}
                                    {this.renderStep("4", "row StepCentered bottomspace", "col-sm-5 darkStep", "Open the directory where the generated files were placed by the wsimport command")}
                                    {this.renderStep("5", "row bottomspace", "col-sm-5 darkStep", "Copy the generated directory")}
                                    {this.renderStep("6", "row StepCentered bottomspace", "col-sm-5 darkStep", 'Paste the generated directory under the "example" package of your project')}
                                    {this.renderStep("7", "row bottomspace", "col-sm-5 darkStep", 'Add a new Java class (under the "example" package) without the main method and name it "CalculatorClient"')}

                                    <div className="row StepCentered bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >8</strong>
                                        </div>
                                        <div className="col-sm-5 darkStep"><p>Add <span className="italicFont">private static int multiply ( int a, int b )</span> method</p></div>
                                    </div>
                                    {this.renderStep("9", "row bottomspace", "col-sm-5 darkStep", 'In the generated directory find the web service implementation class and the web service interface. Here we assume the implementation class is named "CalculatorService" and the interface "CalculatorWs".')}

                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >10</strong>
                                        </div>
                                        <div className="col-sm-5 darkStep">
                                            <p>
                                                In the "multiply" method body, add the following code to invoke the operation on the web service:
                                            </p>
                                        </div>

                                        <div className="col-sm-6">
                                            <p className="italicFont pCode">
                                                {"{"}  CalculatorService calculatorService = new CalculatorService();<br />
                                                CalculatorWs calculator = calculatorService.getCalculatorPort();<br />
                                                return calculator.multiply ( a, b );  {"}"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row bottomspace">
                                        <div className="col-sm-0 numberStep">
                                            <strong >11</strong>
                                        </div>
                                        <div className="col-sm-6 darkStep">
                                            <p>
                                                Add the "main" method and in its body add the following code and run the program:
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="italicFont pCode">
                                                {"{"}  	int a = 3;<br />
                                                int b = 4;<br />
                                                int result = multiply ( a, b );<br />
                                                System.out.println ( “Result = ” + result );<br />
                                                {"}"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="otherFooter"><Footer /></div>
                </div>
            </div>
        );
    }
}
export default WriteClient