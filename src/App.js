import React, { Component } from 'react';
import './App.css';
import Sidebar from './sidebar';
import Messages from './components/messages';
import {Client, IHTTPConnection,NodeDB,SettingsManager, version} from '@meshtastic/meshtasticjs'

class App extends Component  {


  constructor(props) {
    super(props);
    this.setupHTTP();
    this.addToMessageArray = this.addToMessageArray.bind(this);
    this.state = {
      messages: [],
      meshRadios: []
    };
    
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
      //this.addToMessageArray(event.detail);
    });
  
    httpconn.addEventListener("dataPacket", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(event.detail);
    });
  
    httpconn.addEventListener("userPacket", (event) => {
      console.log(JSON.stringify(event.detail));
      //this.addToMessageArray(event.detail);
    });
  
  
    httpconn.addEventListener("positionPacket", (event) => {
      console.log(JSON.stringify(event.detail));
      //this.addToMessageArray(event.detail);
    });
  
  
    httpconn.addEventListener("nodeListChanged", (event) => {
      console.log(JSON.stringify(event.detail));
      //this.addToMessageArray(event.detail);
    });
  
    httpconn.connect(deviceIp, sslActive)
    .then(result => {
        // console - show some kind of radio status here.
    })
    .then(result => {
  
        // This gets called when the message has been sucessfully sent
        console.log('Message sent!');
    })
  
    .catch(error => { 
      this.setState({
        messages:[...this.state.messages,{
          "from":476491748,
          "to":4294967295,
          "decoded": {
            "data": {
              "typ":"CLEAR_TEXT",
              "payload":"aGV5b29vbw=="
            }
          },
          "id":3698181789,
          "rxSnr":11,
          "rxTime":160540164,
          "hopLimit":1},
          {
            "from":476493745,
            "to":4294967294,
            "decoded": {
              "data": {
                "typ":"CLEAR_TEXT",
                "payload":"aGV5b29vbw=="
              }
            },
            "id":3698181789,
            "rxSnr":11,
            "rxTime":1605401643,
            "hopLimit":1}
        ]
      })
      console.log(error); });
  }

  render() { 
    return (
      <div className="App">
         <div className="App-header">
            <h2>Meshtastic</h2>
          </div>
          <div className="App-Body" >
            <Messages messages={this.state.messages} />
          </div>
          <div className="SidebarDiv">
            <Sidebar />
          </div>
       
      </div>
    );
  }
}

export default App;
