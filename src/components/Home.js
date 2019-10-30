// Home.js

import React, {Component} from 'react';

import '../assets/customStyles.css';
import Login from "./Login";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div style={{
                flex: 1, minHeight: '100%', backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>


                <body>

                <Button variant="primary">
                    Go to login
                    <Link to={'/Login'} className="nav-link">Go To Login</Link>
                </Button>

                </body>


            </div>
        );
    }
}

export default Home;
