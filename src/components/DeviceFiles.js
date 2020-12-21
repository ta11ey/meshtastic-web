import React, { Component } from "react";
import "./DeviceFiles.css";

class DeviceFiles extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      isUploading: false,
      drag: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleDragOut = this.handleDragOut.bind(this)
    this.handleDragIn = this.handleDragIn.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
  }

  /* 
    Drag-n-drop code borrowed from https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929
    and from https://www.smashingmagazine.com/2020/02/html-drag-drop-api-react/
  */
 
  dropRef = React.createRef()

  handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("in")
  }
  
  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("in")
    this.dragCounter++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({drag: true})
    }
  }

  handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("out")
    this.dragCounter--
    if (this.dragCounter === 0) {
      this.setState({drag: false})
    }
  }

  handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({drag: false})
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log(e.dataTransfer.files);
      this.fileUpload(e.dataTransfer.files[0])
      e.dataTransfer.clearData()
      this.dragCounter = 0    
    }
  }

  componentDidMount() {
    let div = this.dropRef.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDrag)
    div.addEventListener('drop', this.handleDrop)
  }

  componentWillUnmount() {
    let div = this.dropRef.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }

  onFormSubmit(e){
    e.preventDefault() // Stop form submit
  
    this.fileUpload(this.state.file)
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file){
    this.setState({isUploading: true})
    const formData = new FormData();
    formData.append('file',file)
    return fetch("/upload",{
      method:"POST",
      body: formData
    }).then((response)=>{
      console.log("File upload successful");
      this.setState({
        file:null,
       isUploading:false
      });
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
          <div
            style={{display: 'inline-block', position: 'relative'}}
            ref={this.dropRef}>
               {this.state.dragging &&
                <div 
                  style={{
                    border: 'dashed grey 4px',
                    backgroundColor: 'rgba(255,255,255,.8)',
                    top: 0,
                    bottom: 0,
                    left: 0, 
                    right: 0,
                    zIndex: 9999
                  }}
                >
                  <div 
                    style={{
                      top: '50%',
                      right: 0,
                      left: 0,
                      textAlign: 'center',
                      color: 'grey',
                      fontSize: 36
                    }}
                  >
                    <div>drop here :)</div>
                  </div>
                </div>
              }
              {this.props.children}
            </div>
        </div>
      );
    }
  }
}

export default DeviceFiles;

