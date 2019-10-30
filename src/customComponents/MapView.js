import React, {Component} from 'react';
import Geosuggest from 'react-geosuggest';
import LocationPicker from 'react-location-picker';

/* Default position */


class MapView extends Component {
    state = {
        address: "New Cairo",
        position: {
            lat: 30.017792,
            lng: 31.3473752,
        },

    };


    componentWillReceiveProps(nextProps, nextContext) {
        this.checkProps(nextProps);
    }

    componentWillMount() {
        this.checkProps(this.props);
    }

    componentDidMount() {
        this.update();
    }

    checkProps = (props) => {
        if (props && props.location) {
            let location = props.location;
            if(location.longitude){
                this.setState({
                    address: location.address,
                    position:{
                        lat: location.latitude,
                        lng: location.longitude}
                })
                //console.log(this.state)
            }

        }
    };

    update = () => {
        if (this.props && this.props.update)
            this.props.update(this.state.position, this.state.address)
    };

    handleLocationChange = ({position, address, places}) =>{

        // Set new location
        this.setState({position,address}, () => this.update());
    }

    onSuggestSelect = (suggest) => {
        if (suggest && suggest.label)
            this.setState({position: suggest.location, address: suggest.label}, () => this.update());
        //console.log(suggest);

        //this._geoSuggest.blur();

    }

    render() {
        return (
            <div>
                <h4>{this.state.address}</h4>
                <div>
                    <Geosuggest
                        style={{
                            width: '100%',
                            height: '40px',
                            paddingLeft: '16px',
                            marginTop: '2px',
                            marginBottom: '100px'
                        }}
                        ref={el => this._geoSuggest = el}
                        country={'EG'}
                        onSuggestSelect={this.onSuggestSelect}
                    />
                    <LocationPicker
                        containerElement={<div style={{height: '100%'}}/>}
                        mapElement={<div style={{height: '400px'}}/>}
                        defaultPosition={{
                            lat: this.state.position.lat,
                            lng: this.state.position.lng
                        }}
                        onChange={this.handleLocationChange}
                        radius={1}
                        zoom={15}
                    />


                </div>
            </div>
        )
    }
}

export default MapView
