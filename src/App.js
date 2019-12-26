import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home.js';
import Login from './components/Login';
import Register from './components/Form.js';
import Diagram from './components/Diagram.js';
import Settings from './components/Settings.js';
import Mystuff from './components/Mystuff.js';
import LoggedIn from './components/LoggedIn';
import LoggedOut from './components/LoggedOut.js';
import AddMoney from './components/AddMoney.js';
import BuyMetal from './components/BuyMetal.js';
import SellMetal from './components/SellMetall';

class App extends React.Component {
    constructor(props) {
        super(props)
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
        return (
            <div>
                <BrowserRouter>

                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                    <Switch>
                        <Route path="/buymetal" component={BuyMetal} />
                    </Switch>
                    <Switch>
                        <Route path="/login" component={Login} />
                    </Switch>

                    <Switch>
                        <Route path="/register" component={Register} />
                    </Switch>

                    <Switch>
                        <Route path="/diagram" component={Diagram} />
                    </Switch>
                    <Switch>
                        <Route path="/settings" component={Settings} />
                    </Switch>
                    <Switch>
                        <Route path="/addmoney" component={AddMoney} />
                    </Switch>
                    <Switch>
                        <Route path="/sellmetal" component={SellMetal} />
                    </Switch>

                    <Switch>
                        <Route path="/mystuff"
                            component={Mystuff}
                        />
                    </Switch>
                    <Switch>
                        <Route path="/loggedin" component={LoggedIn} />
                    </Switch>

                    <Switch>
                        <Route path="/loggedout" component={LoggedOut} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;

function fourOfour() {
    return (
        <div className="main-article">
            <h1>404</h1>
            <p>Nu blev det fel. Prova att logga in istället.</p>
        </div>
    )
}
