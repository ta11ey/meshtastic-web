import * as React from "react";
import { Component } from "react";
import "./messages.css";

class PacketLog extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
  // TODO: This shouldn't be necessary
  // but for some reason, packets from meshtastic.js throw
  // an exception when stringifying them
  PacketToString(value) { 
    try {
      return JSON.stringify(value);
    }
    catch(error) {
      return "Couldn't render packet";
    }
  }
  render() {
    console.log(this.props.packets);
    return (
      <div className="Messages">
        <div className="MessageHistory">
          Packets:
          {this.props.packets.map((value, index) => (
            <div key="packet${index}" style={{
              marginTop: 10,
              border: "1px solid black"
            }}>
              {this.PacketToString(value)}
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PacketLog;
