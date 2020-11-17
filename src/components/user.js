import React, { Component } from "react";

class User extends Component {

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
