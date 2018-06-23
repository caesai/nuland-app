import React from 'react';
import {Text, View} from 'react-native';

const Message = ({message}) => {
  return (
    <Text>
        <Text style={{fontWeight: 'bold'}}>{message.username}</Text>: 
              <Text>{message.message.text}</Text>
    </Text>
  )
}

export default Message
