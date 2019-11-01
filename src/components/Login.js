import React, {Component} from 'react';
import {Form, Button} from "react-bootstrap";
import baseService from "../services/baseService";
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        username: '',
        password: '',
        error: '',
    };


    dismissError = () => {
        this.setState({error: ''});
    }


    handleSubmit = (evt) => {
        evt.preventDefault();

        if (!this.state.username || this.state.username === '') {
            return alert('username is required')
        }

        if (!this.state.password || this.state.password === '') {
            return alert('Password is required');
        }

        baseService.login(
            {
                username: this.state.username,
                password: this.state.password,
                seller: true
            }
        ).then((response) => {
            //do the login steps
            //save the token
            //window.localStorage.setItem('token', value);
            if (response && response.token) {
                window.localStorage.setItem('token', response.token);
                //push the url
                this.props.history.push('/appointments')

            } else {
                alert('Login Failed please try again')
            }


        }).catch((err) => {
            console.log(err)
        })
    }

    onChange = (key, e) => {
        this.setState({[key]: e.target.value});
    };


    render() {
        if (baseService.checkLogin()) {
            //console.log('@login yes iam logged in ');
            if (this.props && this.props.history)
                this.props.history.push('/Appointments')

        }
        return (
            <div>
                <center>
                    <h2>Login</h2>
                </center>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={this.state.username}
                                      onChange={(e) => this.onChange('username', e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={this.state.password}
                                      onChange={(e) => this.onChange('password', e)}/>
                    </Form.Group>

                    <center>
                        <Button variant="primary" type="submit" onClick={(e) => this.handleSubmit(e)}>Login</Button>
                    </center>

                </Form>
            </div>
        );
    }
}

export default Login;
