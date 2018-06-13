import React from 'react';
import {TextInput, Button, View, Dimensions} from 'react-native';

const { width } = Dimensions.get('window');

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }
  onChange(e){
    this.setState({
      message : e.target.value
    })
  }
  render() {
    return (
      <View style={{
        position: 'absolute',
        width: width,
        bottom: 0
      }}>
        <TextInput
          value={this.state.message}
          placeholder='Enter your message'
          onChangeText={(e)=>{
            this.setState({
              'message': e
            })
          }} />
        <Button
          title='Send'
          onPress={()=>{
              this.props.sendMessage({
                type : 'message',
                text : this.state.message
              });
              this.setState({message : ''});
          }}/>
      </View>
      )
  }
}

export default ChatInput
