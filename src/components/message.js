import React, { Component } from "react";
import "./message.css";
import { TypeEnum } from "@meshtastic/meshtasticjs/dist/protobuf";

class Message extends Component {
  sentByUs() {
    return this.props.message.from == "476493745";
  }

  messageBody() {

    if (this.props.message.decoded.data.typ == TypeEnum.CLEAR_TEXT) {
      return this.props.message.decoded.data.payload;
    } else {
      return "Binary data";
    }
  }

  render() {
    console.log("Rendering message");
    console.log(this.props.message);
    let rxTime = new Date(this.props.message.rxTime);
    return (
      <div
        className="Message"
        style={{
          backgroundColor: this.sentByUs() ? "red" : "blue",
          color: this.sentByUs() ? "black" : "white",
          float: this.sentByUs() ? "left" : "right",
        }}
      >
        <div className="MessageHead">
          From: {this.props.message.from} || To: {this.props.message.to}
        </div>
        <div
          className="MessageBody"
          style={{
            textAlign: this.sentByUs() ? "left" : "right",
          }}
        >
          {this.messageBody()}
        </div>
        <div className="MessageFooter">
          RxSnr: {this.props.message.rxSnr} || RxTime:{" "}
          {rxTime.toLocaleString("en-US", { timeZone: "EST" })} || hopLimit:{" "}
          {this.props.message.hopLimit}
        </div>
      </div>
    );
  }
}

export default Message;
