import React, { Component } from 'react';
import './App.css';
import Sidebar from './sidebar';
import Messages from './components/messages';
import {Client, IHTTPConnection,NodeDB,SettingsManager, version} from '@meshtastic/meshtasticjs'
import PacketLog from './components/PacketLog';
import SampleData from './SampleData';
class App extends Component  {

  httpconn

  constructor(props) {
    super(props);
    this.setupHTTP();
    this.addToMessageArray = this.addToMessageArray.bind(this);
    this.addToPacketArray = this. addToPacketArray.bind(this);
    this.changeView = this.changeView.bind(this);
    this.SendMessage = this.SendMessage.bind(this);
    this.state = {
      messages: [],
      meshRadios: [],
      packets: [],
      currentView: "messages"
    };
    
  }

  addToMessageArray(newmessage) {
    this.setState({
      messages: [...this.state.messages,newmessage]
    });
  }

  addToPacketArray(newPacket) {
    this.setState({
      packets: [...this.state.packets,newPacket]
    });
  }

  changeView(newView) {
    this.setState({
      currentView: newView
    });
  }

  SendMessage(message,callback) {
    if (this.httpconn.isConnected) {
      var send = this.httpconn.sendText(message);
      console.log(send);
    }
    callback();
  }

  setupHTTP() { 
    const client = new Client();
    this.httpconn = client.createHTTPConnection();
  
    // Set connection params
    let sslActive;
    if (window.location.protocol === 'https:') {
        sslActive = true;
    } else {
        sslActive = false; 
    }
    let deviceIp = window.location.hostname; // Your devices IP here
  
  
    this.httpconn.addEventListener("fromRadio", (event) => {
      console.log("Radio: " + JSON.stringify(event.detail));
      this.addToPacketArray(event.detail);
    });
  
    this.httpconn.addEventListener("dataPacket", (event) => {
      console.log("Data: " + JSON.stringify(event.detail));
      this.addToMessageArray(event.detail);
    });
  
    this.httpconn.addEventListener("userPacket", (event) => {
      console.log("User: " + JSON.stringify(event.detail));
      this.addToPacketArray(event.detail);
    });
  
  
    this.httpconn.addEventListener("positionPacket", (event) => {
      console.log("Position: " + JSON.stringify(event.detail));
      this.addToPacketArray(event.detail);
    });
  
  
    this.httpconn.addEventListener("nodeListChanged", (event) => {
      console.log("NodeList: " + JSON.stringify(event.detail));
      this.addToPacketArray(event.detail);
    });
  
    this.httpconn.connect(deviceIp, sslActive)
    .then(result => {
        // console - show some kind of radio status here.
    })
    .then(result => {
  
        // This gets called when the message has been sucessfully sent
        console.log('Message sent!');
    }) 
    .catch(error => { 
      this.httpconn.isConnected = false;
      this.setState({
        messages: SampleData.messages
      })
      console.log(error); });
  }

  AppBody() {
    if (this.state.currentView === "messages" ) {
      return ( <Messages messages={this.state.messages} SendMessage={this.SendMessage} /> ); 
    }
    else if(this.state.currentView === "packet_log" ) {
      return ( <PacketLog packets = {this.state.packets} /> )
    }
  }

  render() { 
    return (
      <div className="App">
         <div className="App-header">
            <h2>Meshtastic</h2>
          </div>
          <div className="App-Body" >
            { this.AppBody() }
          </div>
          <div className="SidebarDiv">
            <Sidebar changeView={this.changeView} />
          </div>
       
      </div>
    );
  }
}

export default App;
