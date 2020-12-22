import * as React from "react";
import { Component } from "react";
import User from "./user";


class Users extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11

  renderUsers() {
    if (this.props.users.length > 0) {
      return (
        this.props.users.map((value, index) => (
          <User user={value}/>
        ))
      );
    }
    else {
      return "No users in database";
    }
  }
  render() {
    console.log("Rendering users");
    console.log(this.props.users);
    return (
      <div className="Users">
         {this.renderUsers()}
      </div>
    );
  }
}

export default Users;
