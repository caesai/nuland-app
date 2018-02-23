import React from 'react';

export default class GeoComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      acceleration: [],
      latitude: '',
      longitude: ''
    }
  }
  componentDidMount() {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        var acc = [];

        Expo.DangerZone.DeviceMotion.setUpdateInterval(1000);
        Expo.DangerZone.DeviceMotion.addListener((resp)=>{
          acc.push(resp.acceleration)
        });

        setTimeout(()=>{
          this.setState({
            acceleration: acc,
            latitude: lat,
            longitude: lon
          });

          // fetch('http://188.226.153.11:4000/echo', {
          //   method: 'post',
          //   body: JSON.stringify({'acc': acc, 'lat': lat, 'lon': lon})
          // })
          // .then((resp) => { return resp.json() })
          // .then((res) => { console.log('res:');console.log(res); });
        }, 1000)
      });
    }, 4000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>latitude: {this.state.latitude}</Text>
        <Text>longitude: {this.state.longitude}</Text>
        <Text>acceleration: {this.state.acceleration.map((obj) => {
            return JSON.stringify(obj);
          })
        }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
