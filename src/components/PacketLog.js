import React, { Component } from 'react';
import Message from './message';
import './messages.css';

class PacketLog extends Component  {

  render() {
    console.log(this.props.packets); 
    return (
      <div className="Messages">
        <div className="MessageHistory">
          Packets:
          {this.props.packets.map((value, index)  =>
            <div>
              {JSON.stringify(value)}<br />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PacketLog;