import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

import SideBar from './SideBar.js';

import Utils from '../utils/utils.js';
// taskkill /F /PID node.exe

const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}


export default class Registrate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            textType: 'password',
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            errors: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }
        }
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstName':
                errors.firstName =
                    value.length < 2
                        ? 'Förnamn måste vara minst två tecken långt'
                        : '';
                break;
            case 'lastName':
                errors.lastName =
                    value.length < 2
                        ? 'Efternamn måste vara minst två tecken långt'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Eposten är inte giltig!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be 8 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            console.log(errors)
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (validateForm(this.state.errors)) {
            this.registerUser();
        } else {
            console.error('Invalid Form')
        }
    }

    registerUser = () => {
        fetch(`${Utils.API_ADRESS}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email.toLowerCase(),
                firstName: this.state.firstName,
                password: this.state.password,
                lastName: this.state.lastName
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.hasOwnProperty('data')) {
                    alert(res.data.message)
                    setTimeout(() => {
                        this.setState({ submitted: true });
                    }, 1000);
                }
                else {
                    alert('Användaren finns redan.');
                }

            })
     
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
        const { errors } = this.state;
        return (
            <div>
            <SideBar />
            <div className='main-article'>
                <div className="boxshadow-group col-md-10 col-sm-2">
                    <h1>Registrera ny användare</h1>
                    <Form>
                        <Form.Group controlId="formFirstName" >
                            <Form.Label>Förnamn</Form.Label>
                            <Form.Control type="text" placeholder="Ditt förnamn" name="firstName" onChange={this.handleChange} />
                            {
                                errors.firstName.length > 0 &&
                                <span className='error'>{errors.firstName}</span>
                            }
                        </Form.Group>

                        <Form.Group controlId="formLastName" >
                            <Form.Label>Efternamn</Form.Label>
                            <Form.Control name="lastName" type="text" placeholder="Ditt efternamn" onChange={this.handleChange} />
                            {
                                errors.lastName.length > 0 &&
                                <span className='error'>{errors.lastName}</span>
                            }
                        </Form.Group>

                        <Form.Group controlId="formEmail" >
                            <Form.Label>Epost</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Skriv epost" onChange={this.handleChange} noValidate />
                            <Form.Text className="text-muted">
                                Vi kränger inte eposten  till någon!
                            </Form.Text>
                            {
                                errors.email.length > 0 &&
                                <span className='error'>{errors.email}</span>
                            }
                        </Form.Group>



                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Lösenord</Form.Label>
                            <Form.Control noValidate name="password" type={this.state.textType} onChange={this.handleChange} placeholder="Ditt lösenord" />
                            {
                                errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>
                            }
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check onChange={this.typeOfInputText} type="checkbox" label="Visa lösenord" />
                        </Form.Group>
                        <Button onClick={this.handleSubmit} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                {
                    this.state.submitted ? <Redirect to="/login" /> : null
                }
            </div>
            </div>
        );
    }

}
