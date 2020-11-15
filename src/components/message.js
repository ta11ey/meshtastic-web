import React, { Component } from 'react';
import './message.css';

class Message extends Component  {
  sentByUs() { 
    return this.props.message.from == "476493745";
  }
  render() { 
    return (
      <div 
        className="Message" 
        style= {{
          "background-color": (this.sentByUs() ?  'red' : 'blue' ),
          "float":  (this.sentByUs() ?  'left' : 'right' )
         }} >
         {JSON.stringify(this.props.message)}
      </div>
    );
  }
}

export default Message;