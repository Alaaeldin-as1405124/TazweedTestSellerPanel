import React, {Component} from 'react';

import baseService from "../services/baseService";
import {Button, Form, ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/Col";

class AddTimeSlot extends Component {
    state = {
        timeSlots: [],
        startTime: '',
        endTime: ''
    };

    componentWillMount() {
        this.getTimeSlots();
    }

    getTimeSlots = () => {
        baseService.getTimeSlots().then((timeSlots) => {
            console.log('timeslots from the server ', timeSlots)
            this.setState({timeSlots})
        })
    }

    onChange = (key, e) => {
        this.setState({[key]: e.target.value})
    };

    checkTimeValidity = ()=>{
        //TODO Advance time conflict check
        //check if there is conflict
        let result = true;
        this.state.timeSlots.forEach((singleTimeSlot)=>{
            if(this.state.startTime == singleTimeSlot.startTime || this.state.endTime == singleTimeSlot.endTime)
                result= false;

        })
        return result;
    }
    addTime = () => {
        let timeSlots = [...this.state.timeSlots];
        if(this.state.startTime === '' || this.state.endTime=== ''){
            alert('Please enter valid time');
            return;
        }
        if(this.checkTimeValidity()){

            timeSlots.push({
                startTime: this.state.startTime,
                endTime: this.state.endTime
            });
            baseService.addTimeSlot(timeSlots).then((responnse) => {
                this.getTimeSlots();
                this.setState({startTime:'',endTime:''})
            }).catch((err) => console.log(err));
        }
        else{
            alert("Time conflict")
        }

    }

    removeTimeSlot = (index) => {
        if (window.confirm("Are you sure you want to this time slot? It won't affect the current booked appointments, it will be applied for the future appointments")) {
            let timeSlots = [...this.state.timeSlots];
            timeSlots.splice(index, 1);
            baseService.deleteTimeSlot(timeSlots).then((response) => {
                this.getTimeSlots();//update the current state after changing to the database
            }).catch((err) => console.log(err));
        }

    }

    timeConvert = (time) => {
        //do the format
        time = time.startTime +' to '+time.endTime;
        let newTime = time.split(' to ');
        newTime.map((singleTime, index) => {
            // Check correct time format and split into components
            singleTime = singleTime.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

            if (singleTime.length > 1) { // If time format correct
                singleTime = singleTime.slice(1);  // Remove full string match value
                singleTime[5] = +singleTime[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
                singleTime[0] = +singleTime[0] % 12 || 12; // Adjust hours
            }

            newTime[index] = singleTime.join('');
            if (index === 0)
                newTime[index] += " to ";


        });

        return newTime; // return adjusted time or original string
    };

    render() {
        return (
            <div className={'col-9'}>
                <h2>Add time slot</h2>
                <Form>
                    <Form.Row>
                        <Form.Group className={'col'}>
                            <Form.Label>From</Form.Label>
                            <Form.Control type="time" placeholder="enter start time"
                                          value={this.state.startTime}
                                          onChange={(e) => this.onChange('startTime', e)}/>
                        </Form.Group>
                        <Form.Group className={'col'}>
                            <Form.Label>To</Form.Label>
                            <Form.Control type="time" placeholder="enter ending time"
                                          value={this.state.endTime}
                                          onChange={(e) => this.onChange('endTime', e)}/>
                        </Form.Group>

                        <Form.Group >

                            <Button variant="success" onClick={this.addTime}>
                                <i className="fa fa-plus"/> Add
                            </Button>

                        </Form.Group>



                    </Form.Row>

                </Form>

                {this.state.timeSlots.map((singleTimeSlot, index) => {
                    return (

                        <ListGroup.Item>
                            <div className={'row'}>

                                <p className={'col'}>{this.timeConvert(singleTimeSlot)}</p>
                                <Button variant="danger"
                                        onClick={() => this.removeTimeSlot(index)}>Remove</Button>
                            </div>
                        </ListGroup.Item>

                    )
                })}
            </div>
        );
    }
}

export default AddTimeSlot;

