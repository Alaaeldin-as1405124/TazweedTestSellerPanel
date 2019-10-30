import React, { Component } from 'react';
import { createGeoInput, DefaultGeoInput } from 'react-geoinput';

const SimpleInput = createGeoInput(DefaultGeoInput);

export default class Map extends Component {
    state = {
        address: '',
        geoDestination: '',
    }

    onAddressChange = value => this.setState({ address: value })
    onGeoDestinationChange = value => {
        this.setState({ geoDestination: value })
        console.log(value)
    }

    render() {
        return (
            <div>
                <SimpleInput
                    addressInput={{
                        onChange: this.onAddressChange,
                        value: this.state.address,
                    }}
                    geoDestinationInput={{
                        onChange: this.onGeoDestinationChange,
                        value: this.state.geoDestination,
                    }}
                />
            </div>
        );
    }
}
