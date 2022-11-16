import { deepOrange } from "@material-ui/core/colors";
import React, { Component } from "react";
import axios from "axios";
import config from "../../config.json";
import { Link } from 'react-router-dom';
import DonutChart from "./component/DonutChart.js";

class RobotDetails extends React.Component {
  constructor(props) {
    super(props);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 13);
    this.state = {
        userId:-1,
      robotList: [],
      countList: {
          'total':0,
          'scheduled':0,
          'terminated':0,
          'suspended':0
      }
    };
  }

  //url to be updatedLater
  async componentDidMount() {
    const ud = JSON.parse(sessionStorage.getItem("userDetails"));
    const result1 = await axios
      .get(config.backEndURL+"/robot/all?id="+ud.userId )
      .then(
        (res) => {
            console.log("hellow world",res);
          return res.data;
        },
        (error) => {}
      );

    this.setState({ robotList: result1 });
    const result2 = await axios
    .get(config.backEndURL+"/robot/count?id="+ud.userId )
    .then(
      (res) => {
        return res.data;
      },
      (error) => {}
    );

  
    const temp={
        'total':0,
        'scheduled':0,
        'terminated':0,
        'suspended':0
    }

    const total= result2.filter(o=>o.name.toUpperCase()==='TOTAL'.toUpperCase())[0];
    temp.total= total?total.count:0;
    const scheduled=result2.filter(o=>o.name.toUpperCase()==='Scheduled'.toUpperCase())[0];
    temp.scheduled=scheduled?scheduled.count:0;
    const terminated=result2.filter(o=>o.name.toUpperCase()==='Terminated'.toUpperCase())[0];
    temp.terminated=terminated?terminated.count:0;
    const suspended=result2.filter(o=>o.name.toUpperCase()==='Suspended'.toUpperCase())[0];
    temp.suspended=suspended?suspended.count:0;
    this.setState({ countList: temp});
    
  

  }

  render() {
    
    return (
      <div class="container m-1">
        {/* <div class="row col-10 m-2">
          <div className="col-3">
            <div className="card  text-center">
              <span
                className="count-name text-white"
                style={{ fontSize: 30, background: "purple" }}
              >
             TOTAL
              </span>

              <span
                className="count-numbers"
                style={{ fontSize: 60, color: "purple" }}
              >
                {this.state.countList.total}
              </span>
            </div>
          </div>
          <div className="col-3">
            <div className="card text-center">
              <span
                className="count-name text-white"
                style={{ fontSize: 30, background: "green" }}
              >
                {" "}
                SCHEDULED
              </span>

              <span
                className="count-numbers"
                style={{ fontSize: 60, color: "green" }}
              >
                {this.state.countList.scheduled}
              </span>
            </div>
          </div>

          <div className="col-3">
            <div className="card text-center">
              <span
                className="count-name text-white"
                style={{ fontSize: 30, background: "orange" }}
              >
                TERMINATED
              </span>

              <span
                className="count-numbers"
                style={{ fontSize: 60, color: "orange" }}
              >
                 {this.state.countList.terminated}
              </span>
            </div>
          </div>

          <div class="col-3">
            <div class="card  text-center">
              <span
                className="count-name text-white"
                style={{ fontSize: 30, background: "red" }}
              >
                {" "}
                SUSPENDED
              </span>

              <span
                className="count-numbers"
                style={{ fontSize: 60, color: "red" }}
              >
                 {this.state.countList.suspended}
              </span>
            </div>
          </div>
        </div> */}
        <DonutChart robotData = {this.state.countList}/>
        <div class="row col-10 m-3">
          <div class="card">
              <div class="row">
                  <div class="col-6">
            <h3>Robot Details</h3>
            </div>
            <div class="col-6">
            <Link to="/manage-robots" className="btn btn-primary m-1" style={{float:'right'}}>Register Robot</Link>
            </div>
            </div>
            <table className="table table-hover table-striped">
              <thead>
                <th>ROBOT NAME</th>
                <th>STATUS </th>
                <th>ASSIGNED USER</th>
                <th>USER EMAIL</th>
              </thead>
              <tbody>
                {Array.isArray(this.state.robotList) &&
                  this.state.robotList.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.robotName}</td>
                        <td>{data.status}</td>
                        <td>{data.userName}</td>
                        <td>{data.email}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default RobotDetails;
