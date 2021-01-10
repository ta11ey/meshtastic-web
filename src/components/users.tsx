import * as React from "react";
import { Component } from "react";
import User from "./user";
import "./users.css"


class Users extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11

  renderUsers() {
    if (Object.keys(this.props.users).length > 0) {
      return (
        Object.keys(this.props.users).map((key, index) => (
          <User user={this.props.users[key]}/>
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
      <div className="UsersContainer">
         {this.renderUsers()}
      </div>
    );
  }
}

export default Users;
