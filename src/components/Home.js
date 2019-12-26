import React from "react"
import Button from 'react-bootstrap/button';

import gold from "../img/gold.jpg"
import silver from "../img/silver.jpg"
import bronze from "../img/bronze.jpg"

import SideBar from './SideBar.js';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        }
    }


    componentDidMount = () => {
        if (sessionStorage.getItem('meSession') !== null) {
            this.setState({
                loggedIn: true
            })
        }
    }

    render() {
        let articles = [
            {
                name: "Guld",
                img: gold,
                description: "Köp guld till jättehöga priser"
            },
            {
                name: "Silver",
                img: silver,
                description: "Silver från tomtarnas gruvor i underjorden"
            },
            {
                name: "Brons",
                img: bronze,
                description: "Köp brons och kirra en schysst kastrull"
            }
        ]
        return (
            // <div className="container">
            <div>
                <SideBar loggedIn={this.state.loggedIn} />
                <div>
                    <div className="intro">
                        <div className="intro-text">
                            <h1>Projektuppgift i jsramverk</h1>
                            <p>Trading platform</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <SideBar /> */}
                    <div className="main-article">
                        <div className="row">
                            {
                                articles.map((item, key) => {
                                    return (
                                        <div key={key} className="col-md-3 col-sm-12 products">
                                            <img className="com-img" src={item.img} />
                                            <h2>{item.description}</h2>
                                            <Button>Läs mer (fejklänk)</Button>
                                            {/* <p>{item.name}</p> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


