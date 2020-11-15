import React, { Component } from 'react';
import Message from './message';
import './messages.css';

class Messages extends Component  {

  render() {
    console.log(this.props.messages); 
    return (
      <div className="Messages">
        <div className="MessageHistory">
          Messages:
          {this.props.messages.map((value, index)  =>
            <Message message={value.packet} />
          )}
        </div>
        <div className="NewMessage">
        <label>
            Compose Message:<br/>
          <textarea  name="messageEntry" />
        </label>
        <button name="Send">Send</button>
        </div>
      </div>
    );
  }
}

export default Messages;