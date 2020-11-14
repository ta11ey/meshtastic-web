import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Client, IHTTPConnection,NodeDB,SettingsManager, version} from '@meshtastic/meshtasticjs'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

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
  console.log(event.detail.toJSON());
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