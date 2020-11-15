import React, { Component } from 'react';
import './message.css';

class Message extends Component  {

  render() { 
    return (
      <div 
        className="Message" 
        style= {{
          "background-color": (this.props.message.from == "476493745" ?  'red' : 'blue' )
         }} >
         {JSON.stringify(this.props.message)}
      </div>
    );
  }
}

export default Message;