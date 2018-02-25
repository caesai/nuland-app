import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

var RNFS = require('react-native-fs');
// const readAsBinary = filename => {
// if (typeof process === 'object' && typeof require === 'function') {
//     const fs = require('fs');
//     return !binary.buffer ? new Uint8Array(binary) : binary;
// } else
//     return typeof readbuffer === 'function'
//         ? new Uint8Array(readbuffer(file))
//         : read(file, 'binary');
// };

// const instance = new WebAssembly.Instance(new WebAssembly.Module(readAsBinary('../wasm/geoclient.wasm')), {});

function mapDispatchToProps (dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoclient: null
    }
  }
  componentDidMount() {
    console.log(RNFS);

    RNFS.readFile("/storage/emulated/0/wasm/geoclient.wasm" , 'base64')
      .then((result) => {
        let raw = require('base-64').decode(result);
        let rawLength = raw.length;
        let array = new Uint8Array(new ArrayBuffer(rawLength));
        for(var i = 0; i < rawLength; i++) {
          array[i] = raw.charCodeAt(i);
        }
        const memory = new WebAssembly.Memory({ initial: 512 });
        const instance = new WebAssembly.Instance(new WebAssembly.Module(array),{ env: {
          __extjs_9f22d4ca7bc938409787341b7db181f8dd41e6df: arg => console.log(arg),
          __extjs_db0226ae1bbecd407e9880ee28ddc70fc3322d9c: arg => console.log(arg),
          __extjs_80d6d56760c65e49b7be8b6b01c1ea861b046bf0: arg => console.log(arg),
          __extjs_ff5103e6cc179d13b4c7a785bdce2708fd559fc0: arg => console.log(arg),
          __web_on_grow: arg => console.log(arg),
          memory: memory

        }});
        return instance
         })
         .then((instance) => {
           // log the file contents
           setTimeout(()=>{
             this.setState({
               geoclient: instance.exports.hash()
             })
           },1000)
         })
         .catch((err) => {
           console.log(err.message, err.code);
         });
  }
  render() {
    return (
      <View>
        <Text style={styles.heading}>NuLand Geo App</Text>
        <TouchableHighlight onPress={this.state.geoclient}><Text>Test</Text></TouchableHighlight>
        <Link style={styles.link} to='/login'><Text>Sign In</Text></Link>
        <Link style={styles.link} to='/about'><Text>About</Text></Link>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  link: {
    marginBottom: 10
  }
});

export default connect(()=>{ return {} }, mapDispatchToProps)(MainView);
