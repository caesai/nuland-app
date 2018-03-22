import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../actions/auth';

class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      message:''
    }
  }
  onSwipe(gestureName, gestureState) {
    console.log('Swipe')
   const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
   switch (gestureName) {
     case SWIPE_RIGHT:
       this.props.history.push('/account');
       break;
     }
   }
  componentDidMount() {

  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return(
      <GestureRecognizer
        onSwipeRight={(direction, state) => this.onSwipe(direction, state)}
        config={config}
        style={{
          flex: 1
        }}
        >
        <View>
          <Text></Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}/>
          <TextInput
            onChangeText={(e)=>{
              this.setState({
                message: e
              })
            }}/>
          <Button
            onPress={()=>{
              let sentMessage = 'admin:' + this.state.message;
              this.setState({
                text: sentMessage
              })
            }}
            title='Send'
            >
            </Button>
            <Button
              onPress={()=>{
                this.props.dispatch(actions.logout());
              }}
              title='logout'></Button>
        </View>
      </GestureRecognizer>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated
})

export default connect(mapStateToProps)(Chat)
