import React, { Component } from 'react';
import {Table} from "react-bootstrap";
import baseService from "../services/baseService";
import ConfirmationModal from "./ConfirmationModal";


class Appointments extends Component {

    state={
        appointments:[],
        show:false,
        selectedAppointment:{}
    };
    componentWillMount() {
        baseService.getAppointments().then((response)=>{
            this.setState({appointments:response})
        }).catch(err=>console.log(err))
    }

    eventClicked = (e) =>{
        alert(e);
    }

    close = ()=>{
        this.setState({show:false})
    };
    updateAppointmentStatus = async (status) =>{
        let newAppointment = this.state.selectedAppointment;
        newAppointment.status = status;
        await baseService.updateAppointment(newAppointment);
}
    accept = () =>{
        this.updateAppointmentStatus('Accepted')
        this.close();
    }
    reject = () =>{
        this.updateAppointmentStatus('Rejected')
        this.close();
    }
    timeConvert= (time)=> {
        //expecting array of 2 times
        let newTime = time.split(' to ');
        newTime.map((singleTime,index) =>{
            // Check correct time format and split into components
            singleTime = singleTime.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

            if (singleTime.length > 1) { // If time format correct
                singleTime = singleTime.slice (1);  // Remove full string match value
                singleTime[5] = +singleTime[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
                singleTime[0] = +singleTime[0] % 12 || 12; // Adjust hours
            }

            newTime[index]=singleTime.join('');
            if(index ===0)
                newTime[index]+=" to ";


        });
        //apply (to) string


        return newTime; // return adjusted time or original string
    }
    render() {
        return (
            <div>
                <h2 >Appointments</h2>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.appointments.length > 0 ? this.state.appointments.map((singleAppointment,index) =>{
                        return(

                            <tr onClick={()=>this.setState({selectedAppointment:singleAppointment,show:true})}>
                                <td>{index+1}</td>
                                <td>{singleAppointment.clientId.username}</td>
                                <td>{singleAppointment.requestDate}</td>
                                <td>{this.timeConvert(singleAppointment.time)}</td>
                                <td>{singleAppointment.status}</td>
                            </tr>
                        )
                    }) :<tr> <td colSpan={5}><center>there is no appointments yet</center></td></tr> }
                    </tbody>
                </Table>

                <ConfirmationModal show={this.state.show} close={this.close} accept={this.accept} reject={this.reject}/>
            </div>
        );
    }
}

export default Appointments;

