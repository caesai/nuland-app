import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoiY2Flc2FpIiwiYSI6ImNqZ3Z6Z2VqcTA2N2Eyd3A5bHgwZ3BqcGwifQ.X58SxfWQ8eJwaZHCkONGPA');

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const mapStateToProps = (state) => (console.log(state),{
  geo: state.geoLocation.location
})

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        width: height,
        height: width,
        position : {
          latitude: this.props.geo.lat,
          longitude: this.props.geo.lon
        },
        zoom: 8
    }
  }
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return(
      <View>
        {
          this.props.geo.lat ?
          <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Street}
            zoomLevel={15}
            centerCoordinate={[this.props.geo.lon, this.props.geo.lat]}
            showUserLocation={true}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: height,
              height: width,
              flex: 1
            }}>
          </Mapbox.MapView>
          : <Text>Loading map...</Text>
        }
      </View>
    )
  }
}

export default connect(mapStateToProps)(Map)
