import React, { Component } from 'react';
import './message.css';

class Message extends Component  {
  sentByUs() { 
    return this.props.message.from == "476493745";
  }
  render() { 
    let rxTime = new Date(this.props.message.rxTime);
    return (
      <div 
        className="Message" 
        style= {{
          "background-color": (this.sentByUs() ?  'red' : 'blue' ),
          "color": (this.sentByUs() ?  'black' : 'white' ),
          "float":  (this.sentByUs() ?  'left' : 'right' )
         }} >
        <div className="MessageHead">
        From: {this.props.message.from} || To: {this.props.message.to} 
        </div>
        <div className="MessageBody" style={{
           "text-align":  (this.sentByUs() ?  'left' : 'right' )
        }
        }>
          {atob(this.props.message.decoded.data.payload)}
        </div>
        <div className="MessageFooter">
          RxSnr: {this.props.message.rxSnr} || RxTime: {rxTime.toLocaleString('en-US',{ timeZone:"EST"})} || hopLimit: {this.props.message.hopLimit}
        </div>
      </div>
    );
  }
}

export default Message;