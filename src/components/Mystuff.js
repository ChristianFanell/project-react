import React, { Component } from "react"
import { Redirect, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import SideBar from './SideBar.js';
// import PropTypes from 'prop-types';
import Utils from '../utils/utils.js';
import Button from 'react-bootstrap/Button';

export default class Mystuff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            buyData: [],
            sellData: []
        }
    }

    UNSAFE_componentWillMount = () => {
        if (sessionStorage.getItem('meSession') !== null) {
            this.setState({
                loggedIn: true
            })
        }
    }

    componentDidMount = () => {
        this.getHistory('buyhistory')
        this.getHistory('sellhistory');
    }

    getHistory = (action) => {

        let user = JSON.parse(sessionStorage.getItem('email'));
        let sessionString = JSON.parse(sessionStorage.getItem('meSession'));

        fetch(`${Utils.API_ADRESS}/trade/${action}`, {
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
                if (action === 'buyhistory') {
                    this.printBuy(res)
                }
                if (action === 'sellhistory') {
                    this.printSell(res)
                }

            })
    }


    printBuy = res => {
        this.setState({
            buyData: [...res.data]
        }, () => console.log(this.state.buyData))
    }

    printSell = res => {
        this.setState({
            sellData: [...res.data]
        }, () => console.log('SELL ', this.state.sellData))
    }



    render() {

        let buySum = 0;
        let soldSum = 0;

        if (this.state.buyData.length > 0) {
            buySum = this.state.buyData.map((item, i) => item.p_price)
                .reduce((acc, curr) => {
                    return acc + curr
                });
        }

        if (this.state.sellData.length > 0) {
            soldSum = this.state.sellData.map((item, i) => item.s_price)
                .reduce((acc, curr) => {
                    return acc + curr
                });
        }

        let diff = Math.round(soldSum - buySum);
        let optimistic = 'ok';

        if (diff < 0) optimistic = 'error';

        console.log(JSON.parse(sessionStorage.getItem('meSession')))
        return (

            this.state.loggedIn ?
                <div>
                    <SideBar />
                    <div className="main-article">
                        <div className="col-md-8">
                            <h1>Min tradehistorik</h1>
                            <Table responsive striped bordered hover variant="dark">
                                <thead>
                                    {
                                        this.state.sellData.length > 0 ?
                                            <React.Fragment>

                                                <tr>
                                                    <th>Såld vara</th>
                                                    <th>Kvantitet</th>
                                                    <th>Pris</th>
                                                    <th>Pris per enhet</th>
                                                </tr>
                                            </React.Fragment> : 
                                             <tr>
                                             <th>Du har inte sålt några metaller än.</th>
                                             
                                         </tr>
                                    }

                                </thead>
                                <tbody>
                                    {
                                        this.state.sellData.map((item, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <tr>
                                                        <td>{item.com_name}</td>
                                                        <td>{item.s_amount}</td>
                                                        <td>€{item.s_price}</td>
                                                        <td>€{(item.s_price / item.s_amount).toFixed(2)}</td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table >
                            <Table responsive striped bordered hover variant="dark">
                                <tbody>
                                    {
                                        this.state.sellData.length > 0 ?
                                            <React.Fragment>
                                                <tr>
                                                    <td><strong>SUMMA: €{Math.round(soldSum)}</strong></td>
                                                </tr>
                                            </React.Fragment>
                                            : null
                                    }

                                </tbody>
                            </Table>
                            <Table responsive striped bordered hover variant="dark">

                                <thead>
                                {
                                        this.state.buyData.length > 0 ?
                                            <React.Fragment>

                                                <tr>
                                                    <th>Köpt vara</th>
                                                    <th>Kvantitet</th>
                                                    <th>Pris</th>
                                                    <th>Pris per enhet</th>
                                                </tr>
                                            </React.Fragment> : 
                                             <tr>
                                             <th>Du har inte köpt några metaller än.</th>
                                             
                                         </tr>
                                    }
                                </thead>
                                <tbody>

                                    {
                                        this.state.buyData.map((item, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                    <tr>
                                                        <td>{item.com_name}</td>
                                                        <td>{item.p_amount}</td>
                                                        <td>€{Math.round(item.p_price)}</td>
                                                        <td>€{(item.p_price / item.p_amount).toFixed(2)}</td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                            <Table responsive striped bordered hover variant="dark">
                                <tbody>
                                {
                                        this.state.buyData.length > 0 ?
                                            <React.Fragment>
                                                <tr>
                                                    <td><strong>SUMMA: €{Math.round(buySum)}</strong></td>
                                                </tr>
                                            </React.Fragment>
                                            : null
                                    }
                                </tbody>
                            </Table>

                            <Table responsive striped bordered hover variant="dark">
                                <tbody>
                                    <tr>
                                        <td>RESULTAT: <span className={`${optimistic}`}>{diff}</span></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div> : <Redirect to="/login" />
        )
    }
}
