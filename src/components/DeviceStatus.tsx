import * as React from "react";
import { Component } from "react";
import "./DeviceStatus.css";
import AirtimeChart from "./AirtimeChart";

class DeviceStatus extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
 
  render() {
    console.log(this.props.packets);
    return (
      <div className="DeviceStatus">
        <div>
          TX Airtime % <br/>
          <AirtimeChart 
          timePeriods={this.props.report.data.airtime.tx_log} 
          periodSize={this.props.report.data.airtime.seconds_per_period} 
          width={900}
          height={200} />
        </div>
        <div>
          RX Airtime % <br/>
          <AirtimeChart 
          timePeriods={this.props.report.data.airtime.rx_log} 
          periodSize={this.props.report.data.airtime.seconds_per_period} 
          width={900}
          height={200} />
        </div>
       
        { JSON.stringify(this.props) }
      </div>
    );
  }
}

export default DeviceStatus;
