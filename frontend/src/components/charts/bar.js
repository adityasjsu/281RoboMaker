import React from "react"; 
import {
  Chart, SeriesTemplate, CommonSeriesSettings, Title,
} from 'devextreme-react/chart';
import config from '../../config.json';
const data = [
  { date: '10', number: 30 },
  { date: '11', number: 72 },
  { date: '12', number: 38 },
  { date: '13', number: 182 },
];

class BarChart extends React.Component {
  state={chartdata:[]}
  componentDidMount(){
    this.fetchUsers()
  }
  fetchUsers=async()=>{
      const url=config.backEndURL+"/billing/user/chart/1";
      const response=await fetch(url,{method: 'GET'});
      const data=await response.json();
      console.log(data);
      this.setState({chartdata:data})
  }
  getData=()=>{
    console.log(data)
    this.setState({chartdata: data})
  }
  render() {
    return (
      <div style={{width: '93%' }}>
        <Chart
          id="chart"
          palette="Soft"
          dataSource={this.state.chartdata}>
          <CommonSeriesSettings
            argumentField="date"
            valueField="amount"
            type="bar"
            ignoreEmptyPoints={true}
          />
          <SeriesTemplate nameField="date" />
          <Title
            text="Billing"
            subtitle="Current month-to-date balance"
            fontWeight= "bold"
            position= "right"
          />
        </Chart>
      </div>
    );
  }
}

export default BarChart;
