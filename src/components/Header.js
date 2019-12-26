import React, { Component } from "react"
// import Button from 'react-bootstrap/Button'

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validMail: true
        }
    }
    render() {
        return (

            <div className="header">
                <div className="row">
                    <div className="header-left">
                        {/* <h3></h3> */}
                    </div>
                    <div className="header-centre">
                        {/* <h3></h3> */}
                    </div>
                    <div className="header-right">
                        {/* <h3>logo</h3> */}
                    </div>
                </div>

            </div>
        )
    }
}

