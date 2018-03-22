import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../actions/auth';

class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      message:''
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
        <View>
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
            title='Send'>
            </Button>
        </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated
})

export default connect(mapStateToProps)(Chat)
