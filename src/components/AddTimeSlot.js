import React, {Component} from 'react';

import baseService from "../services/baseService";
import {Button, Form, ListGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class AddTimeSlot extends Component {
    state = {
        timeSlots: [],
        startTime: '',
        endTime: ''
    };

    componentWillMount() {
       this.getTimeSlots();
    }

    getTimeSlots = () =>{
        baseService.getTimeSlots().then((timeSlots) => {
            console.log('timeslots from the server ',timeSlots)
            this.setState({timeSlots})
        })
    }

    onChange = (key, e) => {
        this.setState({[key]: e.target.value})
    };

    addTime = () =>{
        let timeSlots = [...this.state.timeSlots];
        timeSlots.push({
            startTime:this.state.startTime,
            endTime:this.state.endTime
        })
        baseService.addTimeSlot(timeSlots).then((responnse)=>{
            this.getTimeSlots();
        }).catch((err)=>console.log(err));

    }
    removeTimeSlot = (index)=>{
        let timeSlots = [...this.state.timeSlots];
        timeSlots.splice(index,1);
        baseService.deleteTimeSlot(timeSlots).then((response)=>{
            this.getTimeSlots();//update the current state after changing to the database
        }).catch((err)=>console.log(err));

        //this.setState({timeSlots});
    }
    render() {
        return (
            <div>
                <h2>Add time slot</h2>
                <h5> the current day is starting  from {this.state.startTime} : {this.state.endTime}</h5>
                <Form>
                    <Form.Row>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>From</Form.Label>
                            <Form.Control type="time" placeholder="enter start time" onChange={(e)=>this.onChange('startTime',e)}/>
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>To</Form.Label>
                            <Form.Control type="time" placeholder="enter ending time" onChange={(e)=>this.onChange('endTime',e)}/>
                        </Form.Group>


                        <Button variant="success" onClick={this.addTime}>Add</Button>
                    </Form.Row>
                </Form>

                {this.state.timeSlots.map((singleTimeSlot,index)=>{
                    return(

                    <ListGroup.Item>
                        <div className={'row'}>
                            <p>{singleTimeSlot.startTime}:{singleTimeSlot.endTime}</p>
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

