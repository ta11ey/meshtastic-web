import * as React from "react";
import { Component } from "react";
import "./WiFiConnectionWizard.css"

class WiFiNetwork extends Component<any,any> {
  render() {
    return (
      <div className="WiFiNetwork">
        <h4>{this.props.Network.ssid}{this.props.CurrentlyConnected ? "(Connected)":""}</h4>
        RSSI: {this.props.Network.rssi}
      </div>
    )
  }
}

class WiFiConnectionWizard extends Component<WiFiConnectionWizardProps,WiFiConnectionWizardState> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
  
  interval;
  
  constructor(props) {
    super(props);
    this.state = {
      WiFiNetworks: [],
      Busy: true
   }
  }
 
  componentDidMount() {
    this.updateAvailableNetworks()
    this.interval = setInterval(() => {
      this.updateAvailableNetworks()
    }, 10000);
 }

 updateAvailableNetworks() {
  fetch("/json/scanNetworks").then((data)=> {
    data.json().then((responseData) => {
      let networks = this.state.WiFiNetworks;
      responseData.data.networks.map((network,index) => {
       networks[network.ssid] = network
      });
      this.setState({
        WiFiNetworks: networks,
        Busy: false
      })
    });
  })
  }

  render() {
    if(this.state.Busy) {
      return (
        <div className="DeviceStatus">
          Scanning for Networks
        </div>
      );
    }
    else {
      return (
        <div className="WiFiContainer">
          {
            Object.keys(this.state.WiFiNetworks).map((network,index) => {
                return <WiFiNetwork 
                  Network={this.state.WiFiNetworks[network]} 
                  CurrentlyConnected={this.props.CurrentWiFiNetworkSSID == this.state.WiFiNetworks[network]?.ssid} />
              } 
            )
          }
        </div>
      );
    }
  }
}

interface WiFiConnectionWizardState {
  WiFiNetworks: any[];
  Busy: Boolean;
}

interface WiFiConnectionWizardProps {
  CurrentWiFiNetworkSSID: string;
}

export default WiFiConnectionWizard;
