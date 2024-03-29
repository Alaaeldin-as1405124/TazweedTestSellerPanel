import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import React, {Component} from 'react';

export default class Confirmation extends React.Component {
    submit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };

    render() {
        return (
            <div className='container'>
                <button onClick={this.submit}>Confirm dialog</button>
            </div>
        );
    }
}
