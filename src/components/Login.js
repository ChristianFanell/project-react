import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Redirect/*, BrowserRouter*/ } from 'react-router-dom';
// import LoggedIn from './components/LoggedIn';
import SideBar from './SideBar.js';

import Utils from '../utils/utils.js';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            textType: 'password',
            password: '',
            email: '',
            response: '',
            error: null,
            loggedIn: false
        }
    }

    //https://stackoverflow.com/questions/40302344/different-handlechange-functions-for-every-single-element-in-component-react*
    handleChange = e => this.setState({ [e.target.name]: e.target.value });

    handleSubmit = e => {
        e.preventDefault();
        fetch(`${Utils.API_ADRESS}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(res => this.setLogin(res))
    }

    addSession = response => {
        sessionStorage.setItem('meSession', JSON.stringify(response.data.token));
        sessionStorage.setItem('email', JSON.stringify(this.state.email));
    }

    setLogin(response) {
        if (response.errors) {
            this.setState({
                error: response.errors.title
            })
        }
        else if (response.hasOwnProperty('data')) {
            this.setState({
                error: null,
                loggedIn: true
            })
            this.addSession(response);
        }
    }

    typeOfInputText = e => {
        if (e.target.checked) {
            this.setState({
                showPassWord: !this.state.showPassWord,
                textType: 'text'
            });
        }
        else {
            this.setState({
                showPassWord: !this.state.showPassWord,
                textType: 'password'
            });
        }
    }

    render() {
        return (           
            <div>
                <SideBar/>
            <div className="row">
                {
                    this.state.loggedIn ? 
                    <Redirect to='/loggedin'
                    /> : null
                }

                <div className="main-article">

                    <div className="boxshadow-group col-md-10 col-sm-2">
                        <h1>Logga in</h1>

                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Epost</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Skriv epost" onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                    Vi behandlar dina uppgifter bla bla bla
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Lösenord</Form.Label>
                                <Form.Control name="password" type={this.state.textType} placeholder="Ditt lösenord" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check onChange={this.typeOfInputText} type="checkbox" label="Visa lösenord" />
                            </Form.Group>

                            <Button onClick={this.handleSubmit} variant="primary" type="submit">Logga in</Button>

                            {
                                this.state.error ?

                                    <div className="error">
                                        <p>{this.state.error}</p>
                                    </div> : null
                            }

                        </Form>
                        <div className="new-user">
                            <Link to="register">Registrera</Link>
                        </div>

                    </div>
                </div>
            </div>
            </div>
        )
    }
}
