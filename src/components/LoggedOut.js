import React, { Component } from "react"
import { Redirect } from 'react-router-dom';

import SideBar from './SideBar.js';

export default class LoggedOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    UNSAFE_componentWillMount = () => {
        setTimeout(() => {
            this.setState({
                redirect: true
            })
        }, 1500)
    }

    render() {
        return (
            <div>
                {
                    this.state.redirect ? <Redirect to="/"/> : null
                }
                <SideBar loggedIn={false} />
                <div className="main-article">
                    <h1>Du är nu utloggad</h1>
                    <p>Kom tillbaka innan bcrypt går ut</p>
                </div>
            </div>
        )
    }
}