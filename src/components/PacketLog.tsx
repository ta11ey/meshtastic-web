import * as React from "react";
import { Component } from "react";
import "./messages.css";

class PacketLog extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
  // TODO: This shouldn't be necessary
  // but for some reason, packets from meshtastic.js throw
  // an exception when stringifying them
  RawPacketToString(value) {
    try {
      return JSON.stringify(value.packet)
    }
    catch(error) {
      return "Couldn't render packet";
    }
  }
  AppPacketToString(value){ 
    //if (value.packet && value.packet.decoded) {
      //return JSON.stringify(value.packet.decoded.data.GetAppDataMessage()); // this was removed
    //}
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
              Raw Packet: {this.RawPacketToString(value)}<br/>
              Plugin Packet: {this.AppPacketToString(value)}
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PacketLog;
