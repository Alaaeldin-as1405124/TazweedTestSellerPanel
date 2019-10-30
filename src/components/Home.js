// Home.js

import React, {Component} from 'react';

import '../assets/customStyles.css';
import Login from "./Login";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Register from "./Register";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

class Home extends Component {
    state = {
        type: 'login'
    }

    render() {
        return (
            <div style={{
                flex: 1, minHeight: '100%', backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>


                <body style={{padding: 50}}>

                <h2>Tazweed Test Seller Panel</h2>
                <Tabs id="controlled-tab-example" activeKey={this.state.type} onSelect={k => this.setState({type: k})}>
                    <Tab eventKey="login" title="Login">
                        <Login history={this.props.history}/>


                    </Tab>

                    <Tab eventKey="register" title="Registration">
                        <Register history={this.props.history}/>
                    </Tab>
                </Tabs>
                </body>


            </div>
        );
    }
}

export default Home;
