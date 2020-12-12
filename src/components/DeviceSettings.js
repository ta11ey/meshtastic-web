import React, { Component } from "react";
import "./DeviceSettings.css";

class DeviceSettings extends Component {
  render() {

    const prefs = Object.keys(this.props.settings.radioConfig.preferences).map(key => 
      <div>
        <span className="settingLabel">{key} </span>
       <span className="settingValue">{this.props.settings.radioConfig.preferences[key]}</span><br/>
       </div>
    )

    const myInfo = Object.keys(this.props.settings.myInfo).map(key => 
      <div>
        <span className="settingLabel">{key} </span>
       <span className="settingValue">{this.props.settings.myInfo[key]}</span><br/>
       </div>
    )


    const channelSettings = Object.keys(this.props.settings.radioConfig.channelSettings).map(key => 
      <div>
        <span className="settingLabel">{key} </span>
       <span className="settingValue">{this.props.settings.radioConfig.channelSettings[key]}</span><br/>
       </div>
    )

    return (
      <div className="DeviceSettings">
        <div className="DeviceProfile">
          <span className="SectionHeader">Device Profile</span><br/>
          { myInfo }
        </div>
        <div className="UserPreferences">
        <span className="SectionHeader">User Preferences</span><br/>
          {prefs}
        </div>
        
        <div className="ChannelSettings">
        <span className="SectionHeader">Channel Settings</span><br/>
         { channelSettings }


        </div>
      </div>
    );
  }
}

export default DeviceSettings;

