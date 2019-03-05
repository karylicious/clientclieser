import React, { Component } from 'react'

class Progress extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="myprogress">
                            <div className="mydot activedot">1</div>
                            <div className={(this.props.step > 1) ? "myline activeline" : "myline"}></div>
                            <div className={(this.props.step > 1) ? "mydot activedot" : "mydot"}>2</div>
                            <div className={(this.props.step > 2) ? "myline activeline" : "myline"}></div>
                            <div className={(this.props.step > 2) ? "mydot activedot" : "mydot"}>3</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Progress