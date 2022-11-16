import React, { Component } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
class DonutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robotData: props,
    };
  }
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "My Robots",
      },
      subtitles: [
        {
          text: "Total Robots: " + this.props.robotData.total,
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true,
        },
      ],
      data: [
        {
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "0",
          dataPoints: [
            { name: "Scheduled", y: this.props.robotData.scheduled },
            { name: "Terminated", y: this.props.robotData.terminated },
            { name: "Suspended", y: this.props.robotData.suspended },
          ],
        },
      ],
    };
    const containerProps = { width: "85%", position: "relative" };
    return (
      <div>
        <CanvasJSChart
          options={options}
          containerProps={containerProps}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default DonutChart;
