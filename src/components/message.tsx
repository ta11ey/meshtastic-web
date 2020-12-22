import * as React from "react";
import { Component } from "react";
import "./message.css";
import { PortNumEnum } from "../../node_modules/@meshtastic/meshtasticjs/dist/protobuf";

class Message extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
  sentByUs() {
    return this.props.message.from == "476493745";
  }

  messageBody() {

    if (this.props.message.decoded.data.portnum == PortNumEnum.TEXT_MESSAGE_APP) {
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

interface MessageProps {
  message: {
    from: string,
    decoded: any, // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
    rxTime: string,
    rxSnr: any // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
    hopLimit: any // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
  }
}


export default Message;
