import React, { Component } from 'react';
import Message from './message';
import './messages.css';
import {
  httpcon
} from '@meshtastic/meshtasticjs'

class Messages extends Component  {

  constructor(props) {
    super(props);
    this.SendMessage = this.SendMessage.bind(this);
    this.NewMessageChange = this.NewMessageChange.bind(this);
    this.state = {
      NewMessageValue: ""
    }
  }
  
  SendMessage() { 
    this.props.SendMessage(
      this.state.NewMessageValue,
      () => {
        this.setState({
          NewMessageValue: ""
        })
      }
      );

  }

  NewMessageChange(event) { 
    this.setState({
      NewMessageValue: event.target.value
    });
  }

  render() {
    console.log(this.props.messages); 
    return (
      <div className="Messages">
        <div className="MessageHistory">
          Messages:
          {this.props.messages.map((value, index)  =>
            <Message message={value} />
          )}
        </div>
        <div className="NewMessage">
        <label>
            Compose Message:<br/>
          <textarea  name="messageEntry" onChange={this.NewMessageChange} value={this.state.NewMessageValue} />
        </label>
        <button name="Send" onClick={this.SendMessage} >Send</button>
        </div>
      </div>
    );
  }
}

export default Messages;