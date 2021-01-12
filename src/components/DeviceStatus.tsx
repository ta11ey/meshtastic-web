import * as React from "react";
import { Component } from "react";
import "./DeviceStatus.css";

class DeviceStatus extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
  // TODO: This shouldn't be necessary
  // but for some reason, packets from meshtastic.js throw
  // an exception when stringifying them
 
  render() {
    console.log(this.props.packets);
    return (
      <div className="DeviceStatus">
        { JSON.stringify(this.props) }
      </div>
    );
  }
}

export default DeviceStatus;
