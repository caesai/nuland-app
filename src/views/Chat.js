import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

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
    return(
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
      </View>
    )
  }
}

export default Chat
