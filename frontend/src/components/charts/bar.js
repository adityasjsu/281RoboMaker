import React, { useState } from "react";

import {
  Chart, SeriesTemplate, CommonSeriesSettings, Title,
} from 'devextreme-react/chart';
import config from '../../config.json';

var barColors = ["brown"];

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
      //const url=config.backEndURL+"/billing/user/chart/1";
      const ud = JSON.parse(sessionStorage.getItem("userDetails"));
      const url=config.backEndURL+"/billing/user/chart/" + ud.userId;
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
      <div style={{width: '83%' }}>


  <select value="Select" style={{width: '43%' }} >
  <option value="Bar">Bar</option>
  <option value="Pie">Pie</option>
  <option value="Line">Line</option>
  <option value="Doughnut">Doughnut</option>

  </select>

        <Chart
          id="chart"
          palette="brown"
          dataSource={this.state.chartdata}>
          <CommonSeriesSettings
            argumentField="date"
            valueField="amount"
            type="bar"
            //type="pie"
            backgroundColor= "barColors"
            ignoreEmptyPoints={true}
          />

          
          <SeriesTemplate nameField="date" />
          <Title
            text="Bar Chart"
            subtitle=" Month-to-Date Balance"
            fontWeight= "bold"
            position= "left"
          />
        </Chart>
      </div>
    );
  }

 
}

export default BarChart;
