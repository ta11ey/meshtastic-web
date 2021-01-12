import * as React from "react"
import { Component } from "react";
import "./App.css";
import Sidebar from "./sidebar";
import Messages from "./components/messages";
import {
  Client,
} from  "../node_modules/@meshtastic/meshtasticjs/dist/client";
import {
  SettingsManager,
} from  "../node_modules/@meshtastic/meshtasticjs/dist/settingsmanager";
import PacketLog from "./components/PacketLog";
import SampleData from "./SampleData";
import HTTPStatus from "./components/httpstatus";
import Users from './components/users';
import * as Favicon from "../node_modules/react-favicon/dist/react-favicon";
import DeviceSettings from './components/DeviceSettings';
import DeviceFiles from './components/DeviceFiles';
import { MeshPacket, PortNumEnum, User, Position} from "../node_modules/@meshtastic/meshtasticjs/dist/protobuf";
import { MeshNode } from "./types/MeshNode";
import DeviceStatus from "./components/DeviceStatus";

class App extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
  httpconn;
  interval;

  SubOptions = {
    name: "Meshtastic-Web"
  };

  constructor(props) {
    super(props);
    this.addToMessageArray = this.addToMessageArray.bind(this);
    this.addToPacketArray = this.addToPacketArray.bind(this);
    this.changeView = this.changeView.bind(this);
    this.SendMessage = this.SendMessage.bind(this);
    this.SetHTTPStatus = this.SetHTTPStatus.bind(this);
    this.SetRadioStatus = this.SetRadioStatus.bind(this);
    this.SetConnectionStatus = this.SetConnectionStatus.bind(this);
    this.HandleNodeInfoAppPacket = this.HandleNodeInfoAppPacket.bind(this);
    this.HandleNodeInfoAppPacket = this.HandleNodeInfoAppPacket.bind(this);
    this.MergeNewUserDTOWithState = this.MergeNewUserDTOWithState.bind(this);
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
      users: {},
      radioConfig: {},
      myInfo: {},
      owner: {},
      report: {}
    };
  }

  componentDidMount() {
    this.setupHTTP();
    this.interval = setInterval(() => {
      fetch("/json/report").then((data)=> {
        data.json().then((responseData) => 
          this.setState({
            report: responseData
          })
        )
      })
    }, 10000);

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
  HandleNodeInfoAppPacket(UserPacket: MeshPacket) {
    const NodeInfo = User.decode(UserPacket.decoded.data.payload as Uint8Array);
    var rxTime = new Date(0); // The 0 there is the key, which sets the date to the epoch
    rxTime.setUTCSeconds(UserPacket.rxTime);
    const newUserDTO: MeshNode = {
      nodeNumber: UserPacket.from,
      id: NodeInfo.id,
      longName: NodeInfo.longName,
      shortName: NodeInfo.shortName,
      lastSeen: rxTime,
      rxSnr: UserPacket.rxSnr
    }
    this.MergeNewUserDTOWithState(newUserDTO);
  }

  HandlePositionInfoAppPacket(PositionPacket: MeshPacket) {
    const PositionInfo = Position.decode(PositionPacket.decoded.data.payload as Uint8Array);
    var rxTime = new Date(0); // The 0 there is the key, which sets the date to the epoch
    rxTime.setUTCSeconds(PositionPacket.rxTime);
    const newUserDTO: MeshNode = {
      nodeNumber: PositionPacket.from,
      lastSeen: rxTime,
      rxSnr: PositionPacket.rxSnr,
      position: PositionInfo
    }
    this.MergeNewUserDTOWithState(newUserDTO);
   
  }

  MergeNewUserDTOWithState(newUserDTO : MeshNode) {
    
    if (this.state.users.hasOwnProperty(newUserDTO.nodeNumber)) {
      newUserDTO = Object.assign(this.state.users[newUserDTO.nodeNumber],newUserDTO);
      console.log("updating user", newUserDTO);
    }
    var newUsers = this.state.users;
    newUsers[newUserDTO.nodeNumber] = newUserDTO
    this.setState({
      users: newUsers
    });
  }

  setupHTTP() {
    const client = new Client();
    SettingsManager.setDebugMode(0);
    this.httpconn = client.createHTTPConnection();

    // Set connection params
    let sslActive;
    if (window.location.protocol === "https:") {
      sslActive = true;
    } else {
      sslActive = false;
    }

    let deviceIp = window.location.hostname + ":" + window.location.port; // Your devices IP here
    this.httpconn.onConnectedEvent.subscribe((event) => {
      this.SetConnectionStatus(true);
      console.log("connected To Radio");
    }, this.SubOptions);

    this.httpconn.onDisconnectedEvent.subscribe((event) => {
      console.log("disconnected from Radio");
      this.SetConnectionStatus(false);
    }, this.SubOptions);

    this.httpconn.onHTTPTransactionEvent.subscribe((event) => {
      this.SetHTTPStatus(event);
    });

    this.httpconn.onFromRadioEvent.subscribe((event) => {
      this.addToPacketArray(event);
      const now = new Date();
      this.SetRadioStatus({
        interaction_time: now.getTime(),
      });
    }, this.SubOptions);

    this.httpconn.onDataPacketEvent.subscribe((meshPacket: MeshPacket) => {
      console.log("Data: " + JSON.stringify(meshPacket));
      console.log("AppData: ", meshPacket.decoded.data.GetAppDataMessage());
      if (meshPacket.decoded.data.portnum == PortNumEnum.TEXT_MESSAGE_APP) {
        this.addToMessageArray(meshPacket);
      }
      if (meshPacket.decoded.data.portnum == PortNumEnum.NODEINFO_APP) {
        this.HandleNodeInfoAppPacket(meshPacket);
      }
      else if (meshPacket.decoded.data.portnum == PortNumEnum.POSITION_APP) {
        this.HandlePositionInfoAppPacket(meshPacket);
      }
    }, this.SubOptions);

    this.httpconn.onConfigDoneEvent.subscribe((event) => {

      this.addToPacketArray(event);
      this.setState({
        radioConfig: event.radioConfig,
        myInfo: event.myInfo,
        owner: event.user
      })
    }, this.SubOptions);


    this.httpconn
      .connect(deviceIp, sslActive, false, false, 'balanced', 5000)
      .then((result) => { console.log("Connected")})
      .catch((error) => {
        this.httpconn.isConnected = false;
        //this.setState({
        // messages: SampleData.messages
        //})
        console.log("Error connecting: ");
        console.log(error);
      });
  }

  AppBody() {
    if (this.state.currentView === "messages") {
      return (
        <Messages
          messages={this.state.messages}
          users={this.state.users}
          SendMessage={this.SendMessage}
          OurNodeId={this.state.myInfo.myNodeNum}
        />
      );
    } else if (this.state.currentView === "packet_log") {
      return <PacketLog packets={this.state.packets} />;
    } else if (this.state.currentView == "users_list") {
      return <Users users={this.state.users} />;
    } else if (this.state.currentView == "device_settings") {
      return <DeviceSettings 
        radioConfig={this.state.radioConfig} 
        myInfo={this.state.myInfo} 
        owner = {this.state.owner}
        httpconn={this.httpconn} 
        />;
    }
    else if (this.state.currentView == "device_status") {
      return <DeviceStatus 
        report = {this.state.report}
      />
    }
    else if (this.state.currentView == "device_files") {
      return <DeviceFiles />
    }
  }

  GetFavicon() {
    if (this.state.radioIsConnected) {
      return '/static/fav-con.svg'
    }
    else {
      return '/static/fav-dis.svg';
    }
  }



  render() {
    if (this.state.owner) {
      return (
        <div className="App">
          <Favicon url={this.GetFavicon()} alertCount={this.state.messages.length} />
          <div className="App-header">
            <h2>Meshtastic</h2>
          </div>
          <div className="App-Body">{this.AppBody()}</div>
          <div className="SidebarDiv">
            <Sidebar changeView={this.changeView} currentUser={this.state.owner} />
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
    else {
      return (
        <div className="App">
          Loading...
        </div>
      );
    }
  }
}

export default App;
