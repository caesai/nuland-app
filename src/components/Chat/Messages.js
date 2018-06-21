import React from 'react';
import {View, Text, Dimensions} from 'react-native';

import Message from './Message';
import ChatInput from './ChatInput';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages
    }
  }
  static getDerivedStateFromProps(nextProps, prevState){
    return  {
      messages : nextProps.messages,
    }
  }
  render() {
    return(
      <View>
        <View style={{
          height: height - 100,
          paddingHorizontal: 10
        }}>
          {
            this.props.messages.length ? (
              this.props.messages.map((message, i) => {
                return <Message key={i} message={message}/>
              })
            ) : <Text>No messages in chat room</Text>
          }
        </View>
        <ChatInput sendMessage={this.props.sendMessage} botAction={this.props.botAction}/>
      </View>
    )
  }
}

export default Messages
