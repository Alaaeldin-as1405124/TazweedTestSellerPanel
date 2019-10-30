import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Home from './components/Home';
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import baseService from "./services/baseService";
import Register from "./components/Register";
import AddTimeSlot from "./components/AddTimeSlot";
import Appointments from "./components/Appointments";

function RouterComponent() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/register" component={Register}/>
                <PrivateRoute exact path="/addTimeSlot" component={AddTimeSlot}/>
                <PrivateRoute exact path="/Appointments" component={Appointments}/>
                <Route exact path="/Logout" component={Logout}/>
                <Route exact path="/Login" component={Login}/>


            </Switch>
        </Router>
    );
}

const PrivateRoute = ({component: Component}, ...rest) => (
    <Route
        {...rest}
        render={(props) => (
            baseService.checkLogin()
                ? <div><NavBar/> <Component {...props} /></div>
                : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
        )}
    />
);

const Logout = withRouter(({history}) =>{
        baseService.logout();
        history.push("/login");
        return null;
}

);


export default RouterComponent;
