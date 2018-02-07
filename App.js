import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: '',
      longitude: ''
    }
    this.getData = this.getData.bind(this);
  }
  getData() {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      this.setState({
        latitude: lat,
        longitude: lon
      });
    });
    // fetch('http://188.226.153.11:4000/', {
    //   method: 'get'
    // })
    // .then(resp => console.log(resp));
    // setTimeout(()=>{
    //
    //   fetch('http://188.226.153.11:4000/echo', {
    //     method: 'post',
    //     body: JSON.stringify({'lat': lat, 'lon': lon})
    //   })
    //   .then((resp) => { return resp.json() })
    //   .then((res) => { console.log('res:');console.log(res); });
    // },1000);
  }
  componentDidMount() {
      setInterval(this.getData, 5000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>latitude: {this.state.latitude}</Text>
        <Text>longitude: {this.state.longitude}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
