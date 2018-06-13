import React from 'react';
import {View, Text} from 'react-native';

import Message from './Message';
import ChatInput from './ChatInput';

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
        <View>
          {
            this.props.messages.length ? (
              this.props.messages.map((message, i) => {
                return <Message key={i} message={message}/>
              })
            ) : <Text>No messages in chat room</Text>
          }
        </View>
        <ChatInput sendMessage={this.props.sendMessage}/>
      </View>
    )
  }
}

export default Messages
