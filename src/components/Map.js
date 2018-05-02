import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ReactMapGL from 'react-map-gl';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const mapStateToProps = (state) => ({
  geo: state.geoLocation.location
})

class Map extends React.Component {
  state = {
    viewport: {
      width: width,
      height: height,
      latitude: this.props.geo.lat,
      longitude: this.props.geo.lon,
      zoom: 8
    }
  };

  render() {
    return(
      <View>

      </View>
    )
  }
}

export default connect(mapStateToProps)(Map)
