import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Client, IHTTPConnection,NodeDB,SettingsManager, version} from '@meshtastic/meshtasticjs'

class App extends Component  {

  state = {
    messages: []
  }

  constructor(props) {
    super(props);
    this.setupHTTP();
  }

  addToMessageArray(newmessage) {
    this.setState({
      messages: [...this.state.messages,newmessage]
    });
  }

  setupHTTP() { 
    const client = new Client();
    const httpconn =client.createHTTPConnection();
  
    // Set connection params
    let sslActive;
    if (window.location.protocol === 'https:') {
        sslActive = true;
    } else {
        sslActive = false;
    }
    let deviceIp = window.location.hostname; // Your devices IP here
  
  
    httpconn.addEventListener("fromRadio", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(event.detail);
    });
  
    httpconn.addEventListener("dataPacket", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(event.detail);
    });
  
    httpconn.addEventListener("userPacket", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(event.detail);
    });
  
  
    httpconn.addEventListener("positionPacket", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(event.detail);
    });
  
  
    httpconn.addEventListener("nodeListChanged", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(event.detail);
    });
  
    httpconn.connect(deviceIp, sslActive)
    .then(result => {
  
        alert('device has been configured')
        // This gets called when the connection has been established
        // -> send a message over the mesh network. If no recipient node is provided, it gets sent as a broadcast
        return httpconn.sendText('meshtastic is awesome');
  
    })
    .then(result => {
  
        // This gets called when the message has been sucessfully sent
        console.log('Message sent!');
    })
  
    .catch(error => { console.log(error); });
  }

  render() { 
    return (
      <div className="App">
        {this.state.messages.map((value, index) => {
          <pre>{value}</pre>
        })}
      </div>
    );
  }
}

export default App;
