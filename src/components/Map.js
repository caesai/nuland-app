import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const mapStateToProps = (state) => ({
  geo: state.geoLocation.location
})

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewport: {
        width: height,
        height: width,
        latitude: this.props.geo.lat,
        longitude: this.props.geo.lon,
        zoom: 8
      }
    }
  }
  render() {
    return(
      <View>

      </View>
    )
  }
}

export default connect(mapStateToProps)(Map)
