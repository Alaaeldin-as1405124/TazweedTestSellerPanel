import React, {Component} from 'react';
import {Dropdown, Table} from "react-bootstrap";
import baseService from "../services/baseService";
import ConfirmationModal from "./ConfirmationModal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


class Appointments extends Component {

    state = {
        appointments: [],
        appointmentsFiltered: [],
        show: false,
        selectedAppointment: {},
        filter: 'All'
    };

    componentWillMount() {
        baseService.getAppointments().then((response) => {
            this.setState({appointments: response, appointmentsFiltered: response})
        }).catch(err => console.log(err))
    }

    eventClicked = (e) => {
        alert(e);
    }

    close = () => {
        this.setState({show: false})
    };
    updateAppointmentStatus = async (status) => {
        let newAppointment = this.state.selectedAppointment;
        newAppointment.status = status;
        await baseService.updateAppointment(newAppointment);
    }
    accept = () => {
        this.updateAppointmentStatus('Accepted')
        this.close();
    }
    reject = () => {
        this.updateAppointmentStatus('Rejected')
        this.close();
    }

    filter = (filterCondition) => {
        this.setState({filter:filterCondition});
        if(filterCondition === "All")
        {
            this.setState({appointmentsFiltered: this.state.appointments});
            return;
        }
        let appoinntments = [...this.state.appointments];
        appoinntments = appoinntments.filter((singleAppointment) => {
            if (filterCondition === "Pending" || filterCondition === "Accepted" || filterCondition === "Rejected")
                return singleAppointment.status == filterCondition;
            else if (filterCondition === "Coming")
                return singleAppointment.appointmentDate < new Date().toDateString();
            else if (filterCondition === "Past")
                return singleAppointment.appointmentDate > new Date().toDateString()
            else if (filterCondition === "Today")
                return singleAppointment.appointmentDate == new Date().toDateString()
        })
        this.setState({appointmentsFiltered: appoinntments})

    };
    onAppointmentClick = (e,selectedAppointment) => {
        e.preventDefault();
        this.setState({selectedAppointment, show: true})

    }
    renderAppointments = () => {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Request Date</th>
                    <th>Appointment Time</th>
                    <th>Appointment Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.appointmentsFiltered.length > 0 ? this.state.appointmentsFiltered.map((singleAppointment, index) => {
                    return (

                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{singleAppointment.clientId.username}</td>
                            <td>{new Date(singleAppointment.requestDate).toDateString()}</td>
                            <td>{singleAppointment.time}</td>
                            <td>{singleAppointment.appointmentDate}</td>
                            <td>{singleAppointment.status}</td>
                            <td>{singleAppointment.status !=="Pending" ?
                                <p>Action Taken</p>:
                                <a href='' onClick={(e) => this.onAppointmentClick(e,singleAppointment)}>Take Action</a>}
                            </td>
                        </tr>
                    )
                }) : <tr>
                    <td colSpan={7}>
                        <p className={'center'}>there is no {this.state.filter !=="All" && this.state.filter.toLowerCase()} appointments yet</p>
                    </td>
                </tr>}
                </tbody>
            </Table>
        )
    }


    render() {
        return (
            <div>
                <h2>Appointments</h2>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        ({this.state.filter}) Appointments
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onSelect={()=>this.filter('All')} >All</Dropdown.Item>
                        <Dropdown.Item onSelect={()=>this.filter('Today')} >Today</Dropdown.Item>
                        <Dropdown.Item onSelect={()=>this.filter('Pending')} >Pending</Dropdown.Item>
                        <Dropdown.Item onSelect={()=>this.filter('Accepted')} >Accepted</Dropdown.Item>
                        <Dropdown.Item onSelect={()=>this.filter('Rejected')} >Rejected</Dropdown.Item>
                        <Dropdown.Item onSelect={()=>this.filter('Past')} >Past</Dropdown.Item>
                        <Dropdown.Item onSelect={()=>this.filter('Coming')} >Coming</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {this.renderAppointments()}

                <ConfirmationModal show={this.state.show} close={this.close} accept={this.accept} reject={this.reject}/>
            </div>
        );
    }
}

export default Appointments;

