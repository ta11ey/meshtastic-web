import * as React from "react";
import { Component } from "react";

class DeviceFile extends Component<DeviceFileProps,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
 
  render() {
   
    return (
      <div className="DeviceFile">
        <div><a href={this.props.name}>{this.props.name}</a></div>
        <div>{this.props.size}</div>
        <div> 
          <button onClick={
              (event)=>{ 
                event.preventDefault();
                this.props.delete(this.props.name);
              }
            }>Delete</button>
        </div>
      </div>
    );
  }
}

interface DeviceFileProps {
  name: string,
  size: number,
  delete(FileToDelete:string):void
}


export default DeviceFile;
