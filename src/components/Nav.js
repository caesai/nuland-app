import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { connect } from 'react-redux'
import { navActions } from '../actions/nav';

const mapStateToProps = (state) => ({
  tab: state.nav.activeTab
})

class Nav extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.tab,
      tabs: [
        {
          tabName: 'Camera',
          icon: 'camera'
        },
        {
          tabName: 'NuLand Bot',
          icon: 'desktop'
        },
        {
          tabName: 'Account',
          icon: 'userCircle'
        },
        {
          tabName: 'Map/Marks',
          icon: 'map'
        },
        {
          tabName: 'Storage',
          icon: 'folder'
        }
      ]
    }
  }
  componentWillReceiveProps() {
    console.log('Swiper:')
    console.log(this.props.swipe)
  }
  renderRow(tab, key) {
    return (
      <TouchableHighlight
        onPress={()=>{
          console.log(key);
          this.props.dispatch(navActions.setTab({index : key}))
          this.props.swipe.updateIndex(key)
          this.props.swipe.scrollBy(key)
        }}

        key={key}>
        <View style={{
          paddingTop: 10,
          backgroundColor: this.props.tab == key ? '#3b99fc' : '#fff'
        }}>
        <FontAwesome style={{
          fontSize: 20,
          textAlign: 'center',
          color: this.props.tab == key ? '#fff' : '#3b99fc'
        }}>{Icons[tab.icon]}</FontAwesome>
        <Text
          style={{
            fontSize: 15,
            padding: 10,
            color: this.props.tab == key ? '#fff' : '#3b99fc'
          }}>{tab.tabName}</Text>
      </View>
      </TouchableHighlight>
    )
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        { this.state.tabs.map((tab, key) => {
          return this.renderRow(tab, key)
        })}
      </View>
    )
  }
}

export default connect(mapStateToProps)(Nav)
