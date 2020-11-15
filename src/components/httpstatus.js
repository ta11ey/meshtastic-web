import React, { Component } from "react";

class HTTPStatus extends Component {
  state = {
    seconds_since_http_interaction: "",
    seconds_since_radio_packet: "",
  };

  GetTimeColor(seconds) {
    if (seconds < 10) {
      return "green";
    } else if (seconds < 30) {
      return "orange";
    } else {
      return "red";
    }
  }

  GetHTTPColor() {
    return this.props.HTTPStatus !== 200 ? "green" : "red";
  }

  componentDidMount() {
    // borrowed from: https://stackoverflow.com/questions/39426083/update-react-component-every-second
    this.interval = setInterval(() => {
      const now = new Date();
      this.setState({
        seconds_since_http_interaction: Math.trunc(
          (now - this.props.HTTPStatus.interaction_time) / 1000
        ),
        seconds_since_radio_packet: Math.trunc(
          (now - this.props.RadioStatus.interaction_time) / 1000
        ),
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // do this: https://stackoverflow.com/questions/39426083/update-react-component-every-second

  render() {
    console.log(this.props);
    return (
      <div>
        Connected: {this.props.RadioIsConnected ? "true" : "false"}
        &nbsp; || &nbsp; HTTP Status: (
        <span
          style={{
            color: this.GetHTTPColor(),
          }}
        >
          {this.props.HTTPStatus.status}
        </span>
        /
        <span
          style={{
            color: this.GetTimeColor(this.state.seconds_since_http_interaction),
          }}
        >
          {this.state.seconds_since_http_interaction}
        </span>
        ) &nbsp; || &nbsp; Radio Mesh: (
        <span
          style={{
            color: this.GetTimeColor(this.state.seconds_since_radio_packet),
          }}
        >
          {this.state.seconds_since_radio_packet}
        </span>
        )
      </div>
    );
  }
}

export default HTTPStatus;
