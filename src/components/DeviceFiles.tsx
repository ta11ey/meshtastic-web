import * as React from "react";
import { Component } from "react";
import "./DeviceFiles.css";

class DeviceFiles extends Component<any,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      isUploading: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.setState({isUploading: true})
    this.fileUpload(this.state.file).then((response)=>{
      console.log("File upload successful");
      this.setState({
        file:null,
       isUploading:false
      });
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file){

    const formData = new FormData();
    formData.append('file',file)
    return fetch("/upload",{
      method:"POST",
      body: formData
    });
  }

  render() {
    if (this.state.isUploading) {
      return (
        <div className="DeviceFiles">
          Upload in progress
        </div>
      );
    }
    else {
      return (
        <div className="DeviceFiles">
          <form onSubmit={this.onFormSubmit}>
            <input type="file" onChange={this.onChange} />
            <button type="submit">Upload File</button>
          </form>
        </div>
      );
    }
  }
}

export default DeviceFiles;

