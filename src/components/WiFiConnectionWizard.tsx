import * as React from "react";
import { Component } from "react";


class WiFiNetwork extends Component<any,any> {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.Network)}
        {JSON.stringify(this.props.CurrentlyConnected)}
      </div>
    )
  }
}

class WiFiConnectionWizard extends Component<WiFiConnectionWizardProps,WiFiConnectionWizardState> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
  constructor(props) {
    super(props);
    this.state = {
      WiFiNetworks: [],
      Busy: false
   }
  }
 
  componentDidMount() {
   if (this.state.WiFiNetworks?.length === 0) {
     this.updateAvailableNetworks()
   }
 }

 updateAvailableNetworks() {
  this.setState({
    Busy: true
  })
  fetch("/json/scanNetworks").then((data)=> {
    data.json().then((responseData) => 
      this.setState({
        WiFiNetworks: responseData.data.networks,
        Busy: false
      })
    )
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
        <div className="DeviceStatus">
          {
            this.state.WiFiNetworks.map((network,index) => {
                return <WiFiNetwork 
                  Network={network} 
                  CurrentlyConnected={this.props.CurrentWiFiNetworkSSID == network.ssid} />
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
