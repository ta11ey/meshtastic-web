import * as React from "react";
import { Component } from "react";

class User extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11

  render() {
 
    return (
      <div
        className="User"
      >
        {JSON.stringify(this.props.user)}
      </div>
    );
  }
}

export default User;
