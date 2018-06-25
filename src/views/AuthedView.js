import React from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, Dimensions } from 'react-native';

import { connect } from 'react-redux'
import {navActions} from '../actions/nav';

import Account from './Account';
import Camera from './Camera';
import Map from './Map';
import Chat from './Chat';
import Storage from './Storage';

import Nav from '../components/Nav';

class AuthedView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleSwiper: false,
      swiper: null
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visibleSwiper: true,
        swiper: this.refs.swiper
      });
     }, 100);
  }
  render() {
    const { height } = Dimensions.get('window');
    const { width } = Dimensions.get('window');
    return(
      <View>
        <View style={{
          flex: 0,
          flexDirection: 'row'
        }}>
          <Nav swipe={this.state.swiper}/>
        </View>
        <Swiper
          ref='swiper'
          loop={false}
          height={height}
          width={width}
          index={1}
          showsButtons={false}
          showsPagination={false}
          removeClippedSubviews={false}
          onIndexChanged={(index) => {
            this.props.dispatch(navActions.setTab({index : index}))
          }}>
          <Camera />
          <Chat />
          <Account />
          <Map />
          <Storage />
        </Swiper>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeTab: state.nav.activeTab
  }
}

export default connect(mapStateToProps)(AuthedView)
