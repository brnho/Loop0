import React from 'react';
import LocationPicker from 'react-location-picker';
 
export default class LocationPickerExample extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      position: this.props.position, //{ lat: 0, lng: 0 }
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }
 
  handleLocationChange ({ position }) {
    this.setState({ position });
    this.props.onPositionChange(position);
  }
 
  render () {
    return (
      <div>
        <div>
          <LocationPicker
            containerElement={ <div style={ {height: '100%'} } /> }
            mapElement={ <div style={ {height: '10em'} } /> }
            defaultPosition={this.props.position}
            onChange={this.handleLocationChange}
            radius={-1}
            zoom={14}
          />
        </div>
      </div>
    )
  }
}