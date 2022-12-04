import React, { useState,Component }  from "react";

import {
  Chart, SeriesTemplate, CommonSeriesSettings, Title,
} from 'devextreme-react/chart';
import config from '../../config.json';
import { Container } from "@material-ui/core";
import Select from 'react-select';
import { render } from 'react-dom';


const options = [
  { value: 'a', label: 'a' },
  { value: 'b', label: 'b' },
];

var barColors = ["brown"];

const data = [
  { date: '10', number: 30 },
  { date: '11', number: 72 },
  { date: '12', number: 38 },
  { date: '13', number: 182 },
];
function App(){
  const[selects,setSelects]=useState();
  return (
    <div>
      <h1>{selects}</h1>
      <select  value="selects" onChange={e=>setSelects(e.target.value)} style={{width: '43%' }} >
  <option value="Bar">Bar</option>
  <option value="Pie">Pie</option>
  <option value="Line">Line</option>
  <option value="Doughnut">Doughnut</option>
  </select>
    </div>
  )
}

  


class BarChart extends React.Component {
  
  state = {
    selectedOptions: [],
  }

  handleChange = (selectedOptions) => {
    alert("inside");
    this.setState({ selectedOptions });
  }

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
    
    const { selectedOption } = this.state;

    return (
     
      <Container >

{/* <React.Fragment> */}
      {/* <Select
        isMulti
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      /> */}
       {/* <select   value={selectedOption}  onChange={this.handleChange} style={{width: '43%' }} >
  <option value="Bar">Bar</option>
  <option value="Pie">Pie</option>
  <option value="Line">Line</option>
  <option value="Doughnut">Doughnut</option>
  </select>
      {this.state.selectedOptions.map(o => <p>{o.value}</p>)}
      </React.Fragment> */}



      <div  class="center2" style={{width: '93%' }}>

  <select  value="select" style={{width: '43%' }} >
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
      </Container>




    );
  }

 
}

export default BarChart;
