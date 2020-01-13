import React, { Component } from "react"
import { Link, Redirect } from 'react-router-dom';
import SideBar from './SideBar.js';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import Utils from '../utils/utils.js';
import Jumbotron from 'react-bootstrap/Jumbotron';
// import { Item } from "react-bootstrap/lib/Breadcrumb";



export default class SellMetal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myMetals: [],
            quantity: 1,
            total: 0,
            loggedIn: false,
            submitted: false,
            selectedMetal: '',
            price: 0
        }
    }


    UNSAFE_componentWillMount = () => {
        if (sessionStorage.getItem('meSession') !== null) {
            this.setState({
                loggedIn: true,
            })
        }
    }

    getMetalls = () => {
        let user = JSON.parse(sessionStorage.getItem('email'));
        let sessionString = JSON.parse(sessionStorage.getItem('meSession'));

        if (sessionString) {
            fetch(`${Utils.API_ADRESS}/trade/mymetals`, {
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
                        myMetals: res.data
                    })
                })
        }

    }

    componentDidMount = () => {
        this.getMetalls();
    }


    _handleChangeMetal = (event) => {
        this.setState(
            {
                selectedMetal: event.target.value,
            }
        );

        let items = [...this.props.location.state.metals];

        items.map((item, i) => {
            if (item.comName === event.target.value) {
                this.setState({
                    price: item.price
                })
            }
        })
    }

    _handleChange = (event) => {
        if (parseInt(event.target.value) > 0) {
            this.setState(
                {
                    quantity: parseInt(event.target.value),
                }
            );
        }
    }

    Sell = () => {
        let metals = {
            "Guld": 1,
            "Silver": 2,
            "Brons": 3
        }

        let user = JSON.parse(sessionStorage.getItem('email'));
        let sessionString = JSON.parse(sessionStorage.getItem('meSession'));

        fetch(`${Utils.API_ADRESS}/trade/sell`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionString
            },
            body: JSON.stringify({
                id: user,
                amount: Math.round(this.state.quantity * this.state.price),
                quantity: this.state.quantity,
                commodity: metals[this.state.selectedMetal]
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    myMetals: res.data
                })
            });
    }

    handleSubmit = () => {
        this.Sell();
        this.setState({ submitted: true })
    };

    render() {
        let amount = [];
        let grams = [];
        let canSell = false;

        if (this.state.myMetals.length > 0) {
            amount = this.state.myMetals.filter((keyzz) => {
                if (this.state.selectedMetal === keyzz.com_name) {
                    return keyzz.c_sum;
                }
            });
        }

        if (amount[0]) {
            grams = [...Array(amount[0].c_sum).keys()];
        }

        if (this.state.quantity > 0) {
            canSell = true;
        } 

        return (
            this.state.loggedIn ?
                <div className="main-article">
                    <SideBar loggedIn={this.state.loggedIn} />

                    {
                        this.state.submitted ? <ThankYou quant={this.state.quantity} metal={this.state.selectedMetal} total={this.state.quantity * this.state.price} />
                            :
                            <div className="col-md-8">

                                <Jumbotron className="jumbo" fluid>
                                    <div className="layer"></div>
                                </Jumbotron>
                                <h1>Sälj</h1>
                                {/* <h1>Handla</h1> */}

                                <div className="price-table-div">
                                    <Table responsive striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Metall</th>
                                                <th>Pris per enhet</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.location.state.metals.map((item, i) => {
                                                    return (
                                                        <React.Fragment key={i}>
                                                            <tr>
                                                                <td>{item.comName}</td>
                                                                <td>€{item.price.toFixed(2)}</td>
                                                            </tr>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </Table>
                                </div>
                                <div className="buy-div">                                    
                                    <div className="select-div">
                                    <select onChange={this._handleChangeMetal} className="select-css">
                                        <option disabled={this.state.selectedMetal.length > 1 ? true : false}>Välj metall</option>
                                        {
                                            this.state.myMetals.map((n, i) => {
                                                if (n.c_sum > 0) {
                                                    return <option key={i}>{n.com_name}</option>
                                                }
                                            })
                                        }
                                    </select>

                                    </div>
                                    <select className="select-css" onChange={this._handleChange }>
                                        {
                                            grams.length > 0 ? grams.map((n, i) => {
                                                return <option key={i}>{n + 1}</option>
                                            }) :
                                                <option disabled></option>
                                        }
                                    </select>
                                </div>


                                <Table >
                                    <tbody>
                                        <tr>
                                            <td className="total-price">TOTALT: €{Math.round(this.state.price * this.state.quantity)}</td>
                                        </tr>
                                    </tbody>
                                </Table>

                                {
                                    canSell ?
                                        <Button onClick={this.handleSubmit} className="money" variant="outline-primary">Sälj metaller</Button>
                                        :
                                        <Link to="/diagram"><Button className="money" disabled variant="outline-primary">Sälj metaller</Button></Link>

                                }
                                <Link to="/diagram"><Button variant="outline-danger">Avbryt</Button></Link>

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
            <p>Grattis! Du har sålt {props.quant} enheter {props.metal} för : €{Math.round(props.total)}</p>
            <Link to="/diagram">Tillbaka till marknad</Link>
        </div>
    )
}
