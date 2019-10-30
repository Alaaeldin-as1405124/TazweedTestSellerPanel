import React, {Component} from 'react';
import {Form, Button} from "react-bootstrap/";
import baseService from "../services/baseService";

class Register extends Component {
    state = {
        username: '',
        password: '',
        type: 2,
        name: '',
        nameAr: '',
        desc: '',
        descAr: '',
    };

    onChange = (key, e) => {
        this.setState({[key]: e.target.value})
    };
    register = async (evt) => {
        evt.preventDefault();
        let user = {...this.state};
        //validation
        if (user.username === '' || user.password === '' || user.name === '' || user.nameAr === '') {
            alert('Please fill all fields');
            return;
        }

        let result = await baseService.register(user);
        if (!result) {
            alert('failed to register')
        } else {
            alert('Registered successfully');
            this.props.history.push('/Login');
        }

    }

    render() {
        return (
            <div>

                <h2 className={"center"}>Register</h2>


                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username"
                                      onChange={(e) => this.onChange('username', e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"
                                      onChange={(e) => this.onChange('password', e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Shop Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter shop name"
                                      onChange={(e) => this.onChange('name', e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Shop Name (Ar)</Form.Label>
                        <Form.Control type="text" placeholder="Enter arabic shop name"
                                      onChange={(e) => this.onChange('nameAr', e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter shop description"
                                      onChange={(e) => this.onChange('desc', e)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description (Ar)</Form.Label>
                        <Form.Control type="text" placeholder="Enter shop arabic description"
                                      onChange={(e) => this.onChange('descAr', e)} />
                    </Form.Group>

                    <center>
                        <Button variant="primary" type="submit" onClick={(e) => this.register(e)}>Submit</Button>
                    </center>
                </Form>
            </div>
        );
    }
}

export default Register;

