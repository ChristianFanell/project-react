import React, { Component } from "react"
import { Redirect, Link, /*BrowserRouter*/ } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import SideBar from './SideBar.js';
import Form from 'react-bootstrap/Form';
// import Reciept from './Receipt.js';

import Utils from '../utils/utils.js';


export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            amount: 0,
            error: '',
            submitted: false
        }
    }

    UNSAFE_componentWillMount = () => {
        if (sessionStorage.getItem('meSession') !== null) {
            this.setState({
                loggedIn: true
            })
        }
    }

    addToBalance = () => {
        let user = JSON.parse(sessionStorage.getItem('email'));
        let sessionString = JSON.parse(sessionStorage.getItem('meSession'));

        fetch(`${Utils.API_ADRESS}/trade/deposit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionString
            },
            body: JSON.stringify({
                amount: this.state.amount,
                id: user
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })


        // console.log('user = ', balance)
    }

    handleSubmit = () => {
        if (this.state.amount === 0) {
            this.setState({
                error: 'Belopp måste vara högre än €0'
            })
        }
        else {
            let willTransfer = window.confirm(`Vill du sätta in €${this.state.amount} på ditt tradekonto?`);

            if (willTransfer) {
                this.addToBalance();
                setTimeout(() => {
                    this.setState({submitted: true})
                }, 500);
                
            }
        }

    }

    handleChange = e => this.setState({amount: parseInt(e.target.value)})

    render() {
        let user = JSON.parse(sessionStorage.getItem('email'));
        return (
            this.state.loggedIn ?
                <div><SideBar loggedIn={this.state.loggedIn} />

                    <div className="main-article">
                        <div className="col-md-10">
                            
                            {
                                !this.state.submitted ?
                                    <div>
                                        <h1>Sätt in stålar</h1>
                                        <Form>
                                            <Form.Group controlId="formGroupEmail">
                                                <Form.Label>Belopp</Form.Label>
                                                <Form.Control name="amount" onChange={this.handleChange} type="number" min="0" placeholder="€€€€€€€€€€€!!!!" />
                                            </Form.Group>
                                        </Form>
                                        <Button onClick={this.handleSubmit} className="money" variant="outline-primary">Sätt in belopp</Button>

                                        <Link to="/settings"><Button variant="outline-danger">Avbryt</Button></Link>
                                        {
                                            this.state.error.length > 0 ? <p className="error">{this.state.error}</p> : null
                                  }
                                    </div>
                                    :
                                    <ThankYou user={user} amount={this.state.amount}/>
                            }

                        </div>
                    </div>
                </div> : <Redirect to="/login" />
        )
    }
}


function ThankYou(props) {
    return (
        <div>
            <h2>Kvitto</h2>
            <p>Insatt belopp för {props.user}: €{props.amount}</p>
            <Link to="/settings">Tillbaka till inställningar</Link>
        </div>
    )
}
