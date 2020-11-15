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
      messages: [
        { "packet": 
          { 
            "from": 476493745, 
            "to": 4294967295, 
            "decoded": { 
              "position": { 
                "batteryLevel": 34, 
                "time": 1605396101 
              } 
            }, 
            "id": 1202052095, 
            "rxSnr": 10.75, 
            "rxTime": 1605395146, 
            "hopLimit": 3 }
        },
        { "packet": 
          { 
            "from": 476493744, 
            "to": 4294967295, 
            "decoded": { 
              "position": { 
                "batteryLevel": 34, 
                "time": 1605396101 
              } 
            }, 
            "id": 1202052095, 
            "rxSnr": 10.75, 
            "rxTime": 1605395146, 
            "hopLimit": 3 }
        },
        { "packet": 
          { 
            "from": 476493744, 
            "to": 4294967295, 
            "decoded": { 
              "position": { 
                "batteryLevel": 34, 
                "time": 1605396101 
              } 
            }, 
            "id": 1202052095, 
            "rxSnr": 10.75, 
            "rxTime": 1605395146, 
            "hopLimit": 3 }
        },
        { "packet": 
          { 
            "from": 476493744, 
            "to": 4294967295, 
            "decoded": { 
              "position": { 
                "batteryLevel": 34, 
                "time": 1605396101 
              } 
            }, 
            "id": 1202052095, 
            "rxSnr": 10.75, 
            "rxTime": 1605395146, 
            "hopLimit": 3 }
        },
        { "packet": 
          { 
            "from": 476493744, 
            "to": 4294967295, 
            "decoded": { 
              "position": { 
                "batteryLevel": 34, 
                "time": 1605396101 
              } 
            }, 
            "id": 1202052095, 
            "rxSnr": 10.75, 
            "rxTime": 1605395146, 
            "hopLimit": 3 }
        }
        ],
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
      this.addToMessageArray(JSON.stringify(event.detail));
    });
  
    httpconn.addEventListener("dataPacket", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(JSON.stringify(event.detail));
    });
  
    httpconn.addEventListener("userPacket", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(JSON.stringify(event.detail));
    });
  
  
    httpconn.addEventListener("positionPacket", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(JSON.stringify(event.detail));
    });
  
  
    httpconn.addEventListener("nodeListChanged", (event) => {
      console.log(JSON.stringify(event.detail));
      this.addToMessageArray(JSON.stringify(event.detail));
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
