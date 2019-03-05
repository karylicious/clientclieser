import React, { Component } from 'react'
import Logo from './logo'


class OpeningText extends Component {
    render() {
        return (
            <div className="highlighted">
                <div className="blueborder">
                    <Logo></Logo>
                    <p className="openingtext">Learn how to create your own <span className="bluespan">Client Server</span> system and then validate it!</p>
                </div>
            </div>
        );
    }
}
export default OpeningText