import React, { Component } from "react"
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';
import SideBar from './SideBar.js';
import { Redirect } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

// taskkill /F /PID node.exe


// snodd från https://codesandbox.io/s/qqo8k12po9?from-embed
const lineOptions = {
    scales: {
        xAxes: [{
            gridLines: {
                display: true,
            },
        }],
        yAxes: [{
            // stacked: true,
            gridLines: {
                display: true,
            },
            ticks: {
                beginAtZero: true,
                // Return an empty string to draw the tick line but hide the tick label
                // Return `null` or `undefined` to hide the tick line entirely
                userCallback(value) {
                    // Convert the number to a string and splite the string every 3 charaters from the end
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);

                    // Convert the array to a string and format the output
                    value = value.join('.');
                    return `€${value}`;
                },
            },
        }],
    },
    legend: {
        display: false,
    },
    tooltips: {
        enabled: false,
    },
};

let silver = [];
let gold = [];
let bronze = [];
let labels = [];

export default class Diagram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: {}
        }

        this.socket = io('http://localhost:8009')
        this.socket.on('connect', () => {
            console.log('connected (client)')
        });
    }

    getDateAndTime = () => {

   
        let now = new Date();
        let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
        let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        let year = now.getFullYear().toString().slice(2);
        let month = `${now.getMonth() + 1}`.padStart(2, 0);
        let day = `${now.getDate()}`.padStart(2, 0);

        return `${year}-${month}-${day} ${hour}:${minutes}`;
    }

    componentDidMount = () => {
        this.socket.on('stocks', (socketData) => {
            gold.push(socketData[0].startingPoint);
            silver.push(socketData[1].startingPoint);
            bronze.push(socketData[2].startingPoint);

            let date
                = this.getDateAndTime();

            labels.push(date);
            this.setState({
                loading: false
            })

            if (
                gold.length > 25
                && labels.length > 25

            ) {
                gold.shift();
                labels.shift();
                bronze.shift();
                silver.shift();
            }

            this.setState({
                data: {
                    labels: [...labels],
                    datasets: [
                        setChartValues(
                            {
                                label: 'Guld',
                                metal: gold,
                                backgroundColor: '#D4AF37'
                            }
                        ),
                        setChartValues(
                            {
                                label: 'Silver',
                                metal: silver,
                                backgroundColor: '#C0C0C0'
                            }
                        ),
                        setChartValues(
                            {
                                label: 'Brons',
                                metal: bronze,
                                backgroundColor: '#CD7F32'
                            }
                        )
                    ]
                }
            })
        })
    }

    componentWillUnmount = () => {
        this.socket.disconnect();
    }
    render() {
        let metalPrices = [
            {
                comName: 'Guld',
                price: gold[gold.length - 1]
            },
            {
                comName: 'Silver',
                price: silver[silver.length - 1],
            },
            {
                comName: "Brons",
                price: bronze[bronze.length - 1]
            }
        ];

        let sessionString = JSON.parse(sessionStorage.getItem('meSession'));

        return (
            sessionString ?
            <div>
                <SideBar/>
                <div className="main-article">

                    {
                        !this.state.loading ?
                            <div className="col-md-6 col-sm-10">
                                <h1>Market</h1>
                                <div className="">
                                    {
                                        metalPrices.map((met, i) => {
                                            return (
                                                <div key={i} className="metal-expl">
                                                    <div className={`${met.comName.toLowerCase()} metal`}></div>
                                                    <div className="expl">{met.comName}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <Line
                                    data={this.state.data}
                                    options={lineOptions}
                                />

                                <ButtonGroup className="buy-buttons" size="lg">
                                    {
                                        metalPrices.map((met, i) => {
                                            return (
                                                <Link key={i} to={{
                                                    pathname: '/buymetal',
                                                    state: {
                                                        name: met.comName,
                                                        val: met.price,
                                                        funds: 0
                                                    }
                                                }}>
                                                    <Button variant="success" key={i}>
                                                        Köp {met.comName} för €{parseFloat(met.price.toFixed(2))}
                                                    </Button>
                                                </Link>
                                            )
                                        })
                                    }
                                    <Link to={{
                                        pathname: '/sellmetal',
                                        state: {
                                            metals: metalPrices
                                        }
                                    }}>
                                        <Button  variant="danger">
                                            Sälj metaller
                                    </Button>
                                    </Link>
                                </ButtonGroup>
                               
                            </div>
                            :
                            <Spinner animation="border" variant="primary" />
                    }
                </div>
            </div>
            : <Redirect to="/login" />
        )
    }
}

function setChartValues(props) {
    return {
        label: props.label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: props.backgroundColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [...props.metal]
    }



}
