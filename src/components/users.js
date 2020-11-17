import React, { Component } from "react";
import User from "./user";


class Users extends Component {

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
