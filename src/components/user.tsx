import * as React from "react";
import { Component } from "react";
import { MeshNode } from "../types/MeshNode";
import "./users.css"

const DEGREES_TO_FLOATING_POINT = .0000001
class User extends Component<UserProps,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11

  renderPosition() { 
    if (this.props.user.position) {
      const latFP = this.props.user.position.latitudeI * DEGREES_TO_FLOATING_POINT
      const longFP = this.props.user.position.longitudeI * DEGREES_TO_FLOATING_POINT
      return (
        <div>
          <span>🔋 {this.props.user.position.batteryLevel}</span>
          <span>🌐 <a 
            href={"https://www.google.com/maps/search/?api=1&query="+latFP+","+longFP}
            target="_blank"
            >{latFP},{longFP}</a></span>
          <span>✈️ {this.props.user.position.altitude}</span>
          
        </div>
      )
    }
  }
  render() {
 
    return (
      <div
        className="User"
      >
        <span className="UserHeader">🧑 {this.props.user.longName} ({this.props.user.shortName})</span>
        <div className="UserBody">
          <span>⏲️ {this.props.user.lastSeen.toLocaleString("en-US", { timeZone: "EST" })}</span>
          <span>🆔 {this.props.user.id}</span>
          <span>📻 {this.props.user.nodeNumber}</span>
          <span>📶 {this.props.user.rxSnr}</span>
          {this.renderPosition()}
        </div>
      </div>
    );
  }
}

export interface UserProps {
  user: MeshNode
}

export default User;
