import React, {Component} from 'react';
import baseService from "../services/baseService";

export default class Logout extends Component {

    render() {
        console.log(this.props.history)
        baseService.logout();
        this.props.history.push('/login');
        return (null);
    }
}

