import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { actions } from '../actions/auth';

import Messages from '../components/Chat/Messages';

class Chat extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name,
      uid: this.props.public,
      chat_ready: false,
      users: [],
      messages: [],
      message: ''
    }
  }
  initChat() {
    this.setState({
      chat_ready: true
    });
    // io.connect('http://localhost:3000');
    this.socket = socketIOClient('ws://194.58.122.82:80', {
      query : 'username='+this.state.username+'&uid='+this.state.uid
    });

    this.socket.on('message', (message) => {
      this.setState({
        messages : this.state.messages.concat(message)
      });
      console.log(message)
    })
  }
  sendMessage(message, e){
    console.log(message);
    this.setState({
      messages : this.state.messages.concat([{
       username : this.props.name,
       uid : this.props.public,
       message : message,
     }])
    });
    this.socket.emit('message', {
      username : this.props.name,
      uid : this.props.public,
      message : message
    });
  }
  componentDidMount() {
    this.initChat()
  }
  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return <Messages sendMessage={this.sendMessage.bind(this)} messages={this.state.messages} />
  }
}

const mapStateToProps = (state) => ({
  auth: state.logIn.isAuthenticated,
  name: state.logIn.name,
  public: state.logIn.public,
})

export default connect(mapStateToProps)(Chat)
