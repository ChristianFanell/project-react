import React, { Component } from "react"
import { Link, Redirect } from 'react-router-dom';
import SideBar from './SideBar.js';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import Utils from '../utils/utils.js';
import Jumbotron from 'react-bootstrap/Jumbotron';



export default class BuyyMetal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balance: 0,
            quantity: 1,
            total: 0,
            canBuy: true,
            loggedIn: false,
            submitted: false
        }
    }


    UNSAFE_componentWillMount = () => {
        if (sessionStorage.getItem('meSession') !== null) {
            this.setState({
                loggedIn: true,
                total: this.props.location.state.val,
            })
        }
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
                    console.log(res)
                    this.setState({
                        balance: res.data.funds
                    })
                })
        }

    }

    componentDidMount = () => {
        this.getBalance();
    }

    _handleChange = (event) => {
        this.setState(
            {
                quantity: event.target.value
            }
        );
    }

    Buy = () => {
        console.log(this.props.location.state.name)
        let metals = {
            "Guld": 1,
            "Silver": 2,
            "Brons": 3
        }
        let user = JSON.parse(sessionStorage.getItem('email'));
        let sessionString = JSON.parse(sessionStorage.getItem('meSession'));

        fetch(`${Utils.API_ADRESS}/trade/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionString
            },
            body: JSON.stringify({
                id: user,
                amount: Math.round(this.state.quantity * this.props.location.state.val),
                quantity: this.state.quantity,
                commodity: metals[this.props.location.state.name]
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            });
    }

    handleSubmit = () => {
        this.Buy();
        this.setState({ submitted: true })
    };

    render() {
        let grams = [...Array(100).keys()];
        let total = this.state.loggedIn ? Math.round(this.state.quantity * this.props.location.state.val) : 0;
        let canBuy = this.state.canBuy;
        let optimistic = 'ok';

        if (total > this.state.balance) {
            canBuy = false;
            optimistic = 'error';
        }

        return (
            this.state.loggedIn ?
                <div className="main-article">
                    <SideBar loggedIn={this.state.loggedIn} />

                    {
                        this.state.submitted ? <ThankYou total={total} metal={this.props.location.state.name} quant={this.state.quantity} />
                            :
                            <div className="col-md-8">

                                <Jumbotron className="jumbo" fluid>
                                    <div className="layer"></div>
                                </Jumbotron>
                                <h1>Köp</h1>
                                {/* <h1>Handla</h1> */}

                                <div className="buy-div">
                                    <h4>Välj mängd</h4>
                                    <select onChange={this._handleChange} className="select-css">
                                        {
                                            grams.map((n, i) => {
                                                return <option key={i}>{n + 1}</option>
                                            })

                                        }

                                    </select>
                                </div>
                                <div className="price-table-div">
                                    <Table responsive striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Metall</th>
                                                <th>Kvantitet</th>
                                                <th>Pris per enhet</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{this.props.location.state.name}</td>
                                                <td>{this.state.quantity}</td>
                                                <td>€{this.props.location.state.val.toFixed(2)}</td>
                                            </tr>

                                        </tbody>
                                    </Table>

                                    <Table >

                                        <tbody>
                                            <tr>
                                                <td className={optimistic}>Tillgängliga medel att handla för: €{Math.round(this.state.balance)}</td>
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td className="total-price">TOTALT: €{Math.round(this.state.quantity * this.props.location.state.val)}</td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                </div>
                                {
                                    canBuy ?
                                        <Button onClick={this.handleSubmit} className="money" variant="outline-primary">Köp metall</Button>
                                        :
                                        <Link to="/diagram"><Button className="money" disabled variant="outline-primary">Köp metall</Button></Link>

                                }

                                <Link to="/diagram"><Button variant="outline-danger">Avbryt</Button></Link>
                                {
                                    !canBuy ? <p className="error">Inte tillräckligt med stålar</p> : null
                                }
                                <div className="back">
                                    <Link to="/diagram">Tillbaka</Link>
                                </div>
                            </div>
                    }

                </div>
                :
                <Redirect to="/login" />
        )
    }
}

function ThankYou(props) {
    return (
        <div className="col-md-8">
            <Jumbotron className="jumbo" fluid>
                <div className="layer"></div>
            </Jumbotron>
            <h2>Kvitto</h2>
            <p>Grattis! Du har köpt {props.quant} enheter {props.metal} för : €{props.total}</p>
            <Link to="/diagram">Tillbaka till marknad</Link>
        </div>
    )
}
