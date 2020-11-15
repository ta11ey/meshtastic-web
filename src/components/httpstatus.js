import React, { Component } from 'react';

class HTTPStatus extends Component  {
  state = {
    seconds_since_interaction: ''
  }

  GetTimeColor() {
    if (this.state.seconds_since_interaction < 10) {
      return "green"
    }
    else if (this.state.seconds_since_interaction < 30) {
      return "orange"
    }
    else {
      return "red"
    }
  }

  GetHTTPColor() {
    return this.props.HTTPStatus != 200 ? "green" : "red" ;
  }

  componentDidMount() {
    
    this.interval = setInterval(() => {
      const now = new Date();
      this.setState({ 
        seconds_since_interaction: Math.trunc((now - this.props.HTTPStatus.interaction_time)/1000)
      })
      }, 1000);
    }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // do this: https://stackoverflow.com/questions/39426083/update-react-component-every-second

  render() { 
    return (
      <div>
        HTTP Status: (<span style={{
          color: this.GetHTTPColor()
        }}>{this.props.HTTPStatus.status}</span>/
        <span style={{
          color: this.GetTimeColor()
        }}>{this.state.seconds_since_interaction}</span>)
      </div>
    );
  }
}

export default HTTPStatus;