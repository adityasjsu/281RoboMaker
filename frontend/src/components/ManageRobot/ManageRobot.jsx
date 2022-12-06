import React, { Component } from 'react';
import LeftSideBar from '../HomePage/LeftSideBar/LeftSideBar';
import Header from "../HomePage/Header/Header";
import { buildQueries } from "@testing-library/react";
import DateTimePicker from "react-datetime-picker";
import moment, { isMoment } from "moment";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '@material-ui/core';


import config from "../../config.json";

class ManageRobot extends React.Component {

    constructor(props) {   
    super(props);
    this.state = {
      robotName: "",
      robotType: "",
      manuName: "",
      os: "",
      version: "",
      xLoc: "",
      yLoc: "",
      zLoc : ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  handleSubmit(){

    const ud = JSON.parse(sessionStorage.getItem("userDetails"));
    const data = { robot: {
      robotName: this.state.robotName,
      robotType: this.state.robotType,
      manuName: this.state.manuName,
      os: this.state.os,
      version: this.state.version,
      xLoc: this.state.xLoc,
      yLoc: this.state.yLoc,
      zLoc : this.state.zLoc },
      userId: ud.userId
    };
    const success="Data Saved Successfully!!";    
    const headers = { headers: { "Content-Type": "application/json" } };
        axios.post(config.backEndURL+"/robot/save", data,headers)
       .then(function (response) {
          if(response.status==200 || response.status==201){
            toast.success("Successfull!!");
          }
        })
        .catch( err => {
          toast.error("Error Occured. Please check logs");
        });
   

  };
  

    render() { 
        return (
         <Container>
  <div className="container p-2 center9">
    <div className="row" >
      <div className="col">
        <div className="card card-registration" style={{width:'90%'}}>
        <ToastContainer autoClose={3000}  />
            <form onSubmit={this.handleSubmit} success={this.state.formSuccess} error={this.state.formError}>
        {/* <div class="mydiv"><h3 className="m-2 text-uppercase">Register Robot</h3></div> */}
        <div className="card-header text-white bg-dark pt-14 pb-14 text-center "><b>Add New Robot</b></div>
       
          <div className="row g-0 register-body">
             
         
            <div>
              <div className="p-5 text-black">

                <div className="row">
                  <div className="col-4 mb-4">
                    <div className="form-outline">
                    <label className="form-label">ROBOT NAME</label>
                   
                    </div>
                  </div>
                  <div className="col-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="robotName"  value={this.state.robotName} onChange={event => this.setState({ robotName: event.target.value })} className="form-control" />
        
                    </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-4 mb-4">
                    <div className="form-outline">
                    <label className="form-label">ROBOT TYPE</label>
                   
                    </div>
                  </div>
                  <div className="col-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="robotName" value={this.state.robotType} onChange={event => this.setState({ robotType: event.target.value })}  className="form-control" />
        
                    </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-4 mb-4">
                    <div className="form-outline">
                    <label className="form-label" value={this.state.manuName} onChange={event => this.setState({ manuName: event.target.value })} >MANUFACTURER NAME</label>
                   
                    </div>
                  </div>
                  <div className="col-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="robotName" className="form-control" />
        
                    </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-4 mb-4">
                    <div className="form-outline">
                    <label className="form-label" >OPERATION SYSTEM</label>
                   
                    </div>
                  </div>
                  <div className="col-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="robotName"  value={this.state.os}  onChange={event => this.setState({ os: event.target.value })}  className="form-control" />
        
                    </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-4 mb-4">
                    <div className="form-outline">
                    <label className="form-label">VERSION</label>
                   
                    </div>
                  </div>
                  <div className="col-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="robotName"  value={this.state.version}  onChange={event => this.setState({ version: event.target.value })} className="form-control" />
        
                    </div>
                  </div>
                  
                </div>
              

              </div>
            </div>
            
            {/* <div class="col-5">
            <div className="p-5 text-black">
            <div className="row">
                  <div className="col-4 mb-4">
                    <div className="form-outline">
                    <label className="form-label" >X LOCATION</label>
                   
                    </div>
                  </div>
                  <div className="col-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="robotName" value={this.state.xLoc} onChange={event => this.setState({ xLoc: event.target.value })}  className="form-control" />
        
                    </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-4 mb-4">
                    <div className="form-outline">
                    <label className="form-label">Y LOCATION</label>
                   
                    </div>
                  </div>
                  <div className="col-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="robotName" value={this.state.yLoc} onChange={event => this.setState({ yLoc: event.target.value })} className="form-control" />
        
                    </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-4 mb-4">
                    <div className="form-outline">
                    <label className="form-label">Z LOCATION</label>
                   
                    </div>
                  </div>
                  <div className="col-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="robotName" value={this.state.zLoc}  onChange={event => this.setState({ zLoc: event.target.value })}  className="form-control" />
        
                    </div>
                  </div>
                  </div>
                </div>

           
            </div> */}
          </div>
          <div className="row g-0" style={{marginLeft:'40%'}}>           
                <button type="submit" className="col-2 float-right btn btn-dark btn-sm m-2 submit-button" >
                  Create 
                </button>
                <button type="reset" className="col-2 float-right btn btn-dark btn-sm m-2 submit-button" >
                  Reset
                </button>
                </div>
                </form>
        </div>
      </div>
    </div>
  </div>
  </Container> 
            
        );
    }
}
 
export default ManageRobot;