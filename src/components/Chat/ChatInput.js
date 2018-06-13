import React from 'react';
import {TextInput, Button, View} from 'react-native';

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
      <View>
        <TextInput
          value={this.state.message}
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
