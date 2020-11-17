import React, { Component } from "react";
import "./App.css";
import Sidebar from "./sidebar";
import Messages from "./components/messages";
import {
  Client,
  IHTTPConnection,
  NodeDB,
  SettingsManager,
  version,
} from "@meshtastic/meshtasticjs";
import PacketLog from "./components/PacketLog";
import SampleData from "./SampleData";
import HTTPStatus from "./components/httpstatus";
import Users from './components/users';
import Favicon from 'react-favicon';


class App extends Component {
  httpconn;

  constructor(props) {
    super(props);
    this.addToMessageArray = this.addToMessageArray.bind(this);
    this.addToPacketArray = this.addToPacketArray.bind(this);
    this.changeView = this.changeView.bind(this);
    this.SendMessage = this.SendMessage.bind(this);
    this.SetHTTPStatus = this.SetHTTPStatus.bind(this);
    this.SetRadioStatus = this.SetRadioStatus.bind(this);
    this.SetConnectionStatus = this.SetConnectionStatus.bind(this);
    this.UpdateUserList = this.UpdateUserList.bind(this);

    const now = new Date();
    this.state = {
      messages: [],
      meshRadios: [],
      packets: [],
      currentView: "messages",
      httpConnectionStatus: {
        interaction_time: now,
      },
      radioPacketStatus: {
        interaction_time: now.getTime(),
      },
      radioIsConnected: false,
      users: []
    };    
  }

  componentDidMount() {
    this.setupHTTP();
  }

  addToMessageArray(newmessage) {
    this.setState({
      messages: [...this.state.messages, newmessage],
    });
  }

  addToPacketArray(newPacket) {
    this.setState({
      packets: [...this.state.packets, newPacket],
    });
  }

  changeView(newView) {
    this.setState({
      currentView: newView,
    });
  }

  SendMessage(message, callback) {
    if (this.httpconn.isConnected) {
      var send = this.httpconn.sendText(message);
    }
    callback();
  }

  SetHTTPStatus(status) {
    this.setState({
      httpConnectionStatus: status,
    });
  }

  SetRadioStatus(status) {
    this.setState({
      radioPacketStatus: status,
    });
  }

  SetConnectionStatus(status) {
    this.setState({
      radioIsConnected: status,
    });
  }
  UpdateUserList(UserPacket) {
    const newUserDTO = {
      id: UserPacket.decoded.user.id,
      longName: UserPacket.decoded.user.longName,
      shortName: UserPacket.decoded.user.shortName,
      lastSeen: UserPacket.rxtime
    }
  
    this.setState({
      users: [...this.state.users,newUserDTO]
    });
  }

  setupHTTP() {
    const client = new Client();
    this.httpconn = client.createHTTPConnection();

    // Set connection params
    let sslActive;
    if (window.location.protocol === "https:") {
      sslActive = true;
    } else {
      sslActive = false;
    }

    let deviceIp = window.location.hostname + ":" + window.location.port; // Your devices IP here
    this.httpconn.addEventListener("connected", (event) => {
      this.SetConnectionStatus(true);
      console.log("connected To Radio");
    });

    this.httpconn.addEventListener("disconnected", (event) => {
      console.log("disconnected from Radio");
      this.SetConnectionStatus(false);
    });

    this.httpconn.addEventListener("httpConnectionStatus", (event) => {
      this.SetHTTPStatus(event.detail);
    });

    this.httpconn.addEventListener("fromRadio", (event) => {
      console.log("Radio: " + JSON.stringify(event.detail));
      this.addToPacketArray(event.detail);
      const now = new Date();
      this.SetRadioStatus({
        interaction_time: now.getTime(),
      });
    });

    this.httpconn.addEventListener("dataPacket", (event) => {
      console.log("Data: " + JSON.stringify(event.detail));
      this.addToMessageArray(event.detail);
    });

    this.httpconn.addEventListener("userPacket", (event) => {
      console.log("User: " + JSON.stringify(event.detail));
      this.addToPacketArray(event.detail);
      this.UpdateUserList(event.detail);
    });

    this.httpconn.addEventListener("positionPacket", (event) => {
      console.log("Position: " + JSON.stringify(event.detail));
      this.addToPacketArray(event.detail);
    });

    this.httpconn.addEventListener("nodeListChanged", (event) => {
      console.log("NodeList: " + JSON.stringify(event.detail));
      this.addToPacketArray(event.detail);
    });


    this.httpconn
      .connect(deviceIp, sslActive,false,false,'balanced',5000)
      .then((result) => {
      })
      .catch((error) => {
        this.httpconn.isConnected = false;
        //this.setState({
        // messages: SampleData.messages
        //})
        console.log("Error connecting: ", error);
      });
  }

  AppBody() {
    if (this.state.currentView === "messages") {
      return (
        <Messages
          messages={this.state.messages}
          SendMessage={this.SendMessage}
        />
      );
    } else if (this.state.currentView === "packet_log") {
      return <PacketLog packets={this.state.packets} />;
    } else if (this.state.currentView == "users_list" ) {
      return <Users users={this.state.users}/>;
    }
  }

  GetFavicon() {
    if (this.state.radioIsConnected) {
      if (this.state.messages.length > 0 ) {
        return 'favicon-connected-unread.ico' 
      }
      else{ 
        return 'favicon-connected.ico' 
      }
    }
    else {
      return 'favicon-disconnected.ico';
    }
  }

  render() {
    return (
      <div className="App">
        <Favicon url={this.GetFavicon()} />
        <div className="App-header">
          <h2>Meshtastic</h2>
        </div>
        <div className="App-Body">{this.AppBody()}</div>
        <div className="SidebarDiv">
          <Sidebar changeView={this.changeView} />
        </div>
        <div className="App-Footer">
          <HTTPStatus
            RadioIsConnected={this.state.radioIsConnected}
            HTTPStatus={this.state.httpConnectionStatus}
            RadioStatus={this.state.radioPacketStatus}
          />
        </div>
      </div>
    );
  }
}

export default App;
