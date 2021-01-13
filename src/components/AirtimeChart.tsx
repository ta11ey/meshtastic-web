import * as React from "react";
import { Component } from "react";

class AirtimeChart extends Component<AirtimeChartProps,any> { // TODO: Properly define / enforce Typescript types https://github.com/meshtastic/meshtastic-web/issues/11
  
  Canvas;

  constructor(props) {      
    super(props);      
    this.Canvas = React.createRef();  
  }

  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.timePeriods !== prevProps.timePeriods) {
      this.updateCanvas();
    }
  }
  updateCanvas() {
    const canvas = this.Canvas.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,this.props.width,this.props.height);

    const periodWidth = this.props.width / this.props.timePeriods.length;

    this.props.timePeriods.map((value,index) => {
      const x =  index*periodWidth;
      const y = this.props.height
      const h = (value /this.props.periodSize) * 100;
      //console.log("Filling in: x:" + x +" y:"+y + " w:" +  periodWidth + " h:"+h);
        ctx.fillStyle = "black";
        ctx.fillRect(x,y,periodWidth,-h);
        ctx.font = "9px sans-serif";
        ctx.strokeText(h.toFixed(0).toString(),x+periodWidth/4,10,periodWidth);
      }
    );
  
  }
 
  render() {
    return (
      <canvas ref={this.Canvas} width={this.props.width} height={this.props.height}/>
    );
  }
}

export interface AirtimeChartProps {
  timePeriods: number[];
  periodSize: number;
  width: number;
  height: number;
}

export default AirtimeChart;
