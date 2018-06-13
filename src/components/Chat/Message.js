import React from 'react';
import {Text, View} from 'react-native';

const Message = ({message}) => {
  return (
    <Text>
        <Text style={{fontWeight: 'bold'}}>{message.username}</Text>: 
        {message.message.type === 'message' ? (
              <Text>{message.message.text}</Text>
        ) : null }
    </Text>
  )
}

export default Message
