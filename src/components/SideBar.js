import React, { Component } from "react"
import { NavLink, /*Link, BrowserRouter*/ } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { IoMdPerson } from 'react-icons/io';
import { IoIosBasket } from 'react-icons/io';
import { IoMdSettings } from 'react-icons/io'; // settings/funds
import { IoIosPulse } from 'react-icons/io'; // diagram
import { IoIosLogOut } from 'react-icons/io';

export default class SideBar extends Component {

    logOut = () => {
        sessionStorage.clear();
    }

    render() {
        let session = sessionStorage.getItem('meSession');
        
        return (

            <div className="side-bar-nav">
                <span className="logotyp"><h1>My trading platform</h1></span>
                {/* <Button>Ok</Button> */}

                <nav>
                    <NavLink className="nav-link-sidebar" to="/" exact activeClassName="chosen">
                        <div className="centered-label">
                            <IoMdHome size={32} />
                        </div>
                    </NavLink>

                    {

                        session ?
                        <NavLink className="nav-link-sidebar"
            
                            to={'/mystuff'}
                            activeClassName="chosen"
                            exact
                        >
                            <div className="centered-label">
                                <IoIosBasket size={32} />
                            </div>
                        </NavLink> : null
                    }

                    {
                        session ?
                        <NavLink className="nav-link-sidebar"
                            to="/settings"
                            activeClassName="chosen" exact>
                            <div className="centered-label">
                                <IoMdSettings size={32} />
                            </div>
                        </NavLink> : null
                    }

                    {
                        session ?

                        <NavLink className="nav-link-sidebar" to="/diagram" activeClassName="chosen" exact>
                            <div className="centered-label">
                                <IoIosPulse size={32} />
                            </div>
                        </NavLink> : null
                    }


                    {
                        session ?
                            <NavLink className="nav-link-sidebar" onClick={this.logOut} to='/loggedout' exact>
                                <div className="centered-label">
                                    <IoIosLogOut size={32} />
                                </div>
                            </NavLink>
                            :
                            <NavLink className="nav-link-sidebar" to="/login" activeClassName="chosen" exact>
                                <div className="centered-label">
                                    <IoMdPerson size={32} />
                                </div>
                            </NavLink>
                    }
                </nav>
            </div>
        )
    }
}


