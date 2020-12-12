import React, { Component } from "react";
import "./DeviceFiles.css";

class DeviceFiles extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log("File upload successful");
      this.setState({file:null});
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

export default DeviceFiles;

