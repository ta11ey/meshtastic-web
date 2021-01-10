import * as React from "react";
import { Component } from "react";
import { MeshNode } from "../types/MeshNode";
import "./users.css"

class User extends Component<UserProps,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11

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
        </div>
      </div>
    );
  }
}

export interface UserProps {
  user: MeshNode
}

export default User;
