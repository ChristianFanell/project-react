import React, { Component } from "react"
import { Redirect, Link/*, BrowserRouter*/ } from 'react-router-dom';

import SideBar from './SideBar.js';
import Button from 'react-bootstrap/Button';
import Utils from '../utils/utils.js';
// import Spinner from 'react-bootstrap/Spinner';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            balance: 0,
            loading: true
        }

    }

    componentDidMount = () => {
        if (sessionStorage.getItem('meSession') !== null) {
            this.setState({
                loggedIn: true
            })
        }
        this.getBalance();
    }

    getBalance = () => {
        let user = JSON.parse(sessionStorage.getItem('email'));
        let sessionString = JSON.parse(sessionStorage.getItem('meSession'));

        if (sessionString) {
            fetch(`${Utils.API_ADRESS}/trade/funds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': sessionString
                },
                body: JSON.stringify({
                    id: user,
                })
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        balance: res.data.funds,
                        loading: false
                    })
                })
        }
    }

    render() {
        let user = JSON.parse(sessionStorage.getItem('email'));
        return (
            this.state.loggedIn ?
                <div><SideBar loggedIn={this.state.loggedIn} />

                    <div className="main-article">
                        <h1>Inställningar</h1>
                        {
                            !this.state.loading ?
                                <p>{user} tradebalans är: €{this.state.balance}</p>
                                :
                                <p>Laddar balans...</p>
                        }
                        <Link to="/addmoney"><Button variant="primary">Sätt in stålar</Button></Link>
                    </div>
                </div> : <Redirect to="/login" />
        )
    }
}
