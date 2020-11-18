import React, { Component } from "react";
import "./DeviceSettings.css";

class DeviceSettings extends Component {
  render() {
    return (
      <div className="DeviceSettings">
        <div className="DeviceProfile">
          <span className="SectionHeader">Device Profile</span><br/>
          <span className="settingLabel">Node Number: </span>
          <span className="settingValue">{this.props.settings.myInfo.myNodeNum}</span><br/>
          <span className="settingLabel">Hardware Model: </span>
          <span className="settingValue">{this.props.settings.myInfo.hwModel}</span><br/>
          <span className="settingLabel">Availalable Channels: </span>
          <span className="settingValue">{this.props.settings.myInfo.numChannels}</span><br/>
          <span className="settingLabel">Has GPS: </span>
          <span className="settingValue">{this.props.settings.myInfo.hasGps.toString()}</span><br/>
          <span className="settingLabel">Firmware Version: </span>
          <span className="settingValue">{this.props.settings.myInfo.firmwareVersion}</span><br/>
        </div>
        <div className="UserPreferences">
        <span className="SectionHeader">User Preferences</span><br/>
          <span className="settingLabel">wifiSsid </span>
          <span className="settingValue">{this.props.settings.radioConfig.preferences.wifiSsid}</span><br/>
        </div>
        
        <div className="ChannelSettings">
        <span className="SectionHeader">Channel Settings</span><br/>
          <span className="settingLabel">Channel Name: </span>
          <span className="settingValue">{this.props.settings.radioConfig.channelSettings.name}</span><br/>
          <span className="settingLabel">Modem Config: </span>
          <span className="settingValue">{this.props.settings.radioConfig.channelSettings.modemConfig}</span><br/>


        </div>
      </div>
    );
  }
}

export default DeviceSettings;

