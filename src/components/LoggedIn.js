import React, { Component } from "react"
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import SideBar from './SideBar.js';

export default class LoggedIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                redirect: true
            })
        }, 1000)
    }

    render() {
        return (
            <div>
                {
                    this.state.redirect ? <Redirect to="/mystuff"/> : null
                }
                <SideBar loggedIn={false} />
                <div className="main-article">
                    <Spinner animation="border" variant="primary" />
                </div>
            </div>
        )
    }
}