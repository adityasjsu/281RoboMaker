import React, { Component } from 'react';
import LeftSideBar from '../HomePage/LeftSideBar/LeftSideBar';
import Header from "../HomePage/Header/Header";
import { buildQueries } from "@testing-library/react";
import mockData from "./Data";
import DateTimePicker from "react-datetime-picker";
import moment, { isMoment } from "moment";
import axios from "axios";
import img1 from "../../images/img-1.jpeg";
import img2 from "../../images/img-2.jpeg";
import config from "../../config.json";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RobotSchedule extends React.Component {
    constructor(props) {
        
        super(props);
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 13);
        this.state = {
          robotList: [
            { id: 1, name: "Robot 1" },
            { id: 2, name: "Robot 2" },
            { id: 3, name: "Robot 3" },
          ],
          masterData:[],
          buildingList: [],
          floorList: [],
          roomList: [],
          selectedBuilding: "",
          selectedFloor: "",
          selectedRoom: "",
          startDate: "",
          selectedRobot: "",
          endDate: "",
          scheduleList: [],
          maxDate : maxDate,
          minDate : new Date(),
          imageUrl : ""
        };
   
        this.changeRobot = this.changeRobot.bind(this);
        this.changeBuilding = this.changeBuilding.bind(this);
        this.changeFloor = this.changeFloor.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      async componentDidMount() {
        const ud = JSON.parse(sessionStorage.getItem("userDetails"));
        const result1 = await axios.get(config.backEndURL+"/robot/floorplans").then(
          (res) => {
            return res.data;
          },
          (error) => {}
        );

        this.setState({ masterData: result1 });
        
        axios.get(config.backEndURL+"/robot/schedule?id="+ud.userId).then(
          (result) => {
            const scheduleList = result.data;
            this.setState({ scheduleList: scheduleList });
          },
          (error) => {}
        );
    
       
        const { data } = mockData;
        const buildingList = [];
        if(this.state.masterData){
        this.state.masterData.map((item) => {
            if (item.id && item.name) {
              buildingList.push({
                id: item.id,
                name: item.name,
              });
            }
          });
        
        this.setState({
          buildingList,
        });
      }
    }
    
      changeStartDate(e) {
        this.setState({
          startDate: e,
        });
      }
    
      changeEndDate(e) {
        this.setState({
          endDate: e,
        });
      }
    
      changeBuilding(e) {
        const { data } = mockData;
        const selectedBuilding = e && e.target && e.target.value;
        const floorList = [];
        if (selectedBuilding) {
          this.state.masterData.map((item) =>
        {
              if (item && item.id && item.id == selectedBuilding) {
                item.floors.map((o) => {
                  if (o.id && o.name) {
                    floorList.push({
                      id: o.id,
                      name: o.name,
                    });
                  }
                });
              }
            });
          
    
          this.setState({
            floorList,
            selectedBuilding,
            roomList: [],
          });
        } else {
          this.setState({
            floorList: [],
            roomList: [],
            selectedBuilding: "",
            selectedFloor: "",
            selectedRoom: "",
          });
        }
      }
    
      changeFloor(e) {
        const { data } = mockData;
        const selectedFloor = e && e.target && e.target.value;
        const roomList = [];
        if (selectedFloor) {
          this.state.masterData.map((item) =>
             {
              if (item && item.id && item.id == this.state.selectedBuilding) {
                item.floors.map((o) => {
                  if (o.id && o.name && o.id == selectedFloor) {
                  
                    o.rooms.map((o) => {
                      roomList.push({
                        id: o.roomId,
                        name: o.roomName,
                      });
                    });
                  }
                });
              }
            });

           
          
          this.setState({
            roomList,
            selectedFloor,
          });
        } else {
          this.setState({
            roomList: [],
            selectedFloor: "",
            selectedRoom: "",
          });
        }
      }
    
      changeRoom(e) {
        const selectedRoom = e && e.target && e.target.value;
        this.setState({
          selectedRoom,
        });

        if(selectedRoom){
            this.state.imageUrl=(selectedRoom%2===0)?img1:img2;
        }else{
            this.state.imageUrl="";
        }
      }
    
      changeRobot(e) {
        const selectedRobot = e && e.target && e.target.value;
        this.setState({
          selectedRobot,
        });
      }
    
      async handleSubmit(e) {
        const ud = JSON.parse(sessionStorage.getItem("userDetails"));

        e.preventDefault();

        const data = {
          buildingId: this.state.selectedBuilding,
          floorId: this.state.selectedFloor,
          roomId: this.state.selectedRoom,
          startDateTime: moment(this.state.startDate).format("YYYY-MM-DD HH:mm:ss"),
          endDateTime: moment(this.state.endDate).format("YYYY-MM-DD HH:mm:ss"),
          robotId: this.state.selectedRobot,
        };
    
       
       const headers = { headers: { "Content-Type": "application/json" } };
       const result1= await axios
          .post(config.backEndURL+"/robot/schedule?id="+ud.userId, data, headers)
          .then(function (response) {
                console.log("response",response.data);
                toast.success(response.data);
                return response;
            })
            .catch(err=>{
              toast.error("Error occured!!")
            });

            

            const result=  await axios.get(config.backEndURL+"/robot/schedule?id="+ud.userId).then(
                (res)=> {return res}
            );

           this.setState({scheduleList: result.data});

      }
    
      render() {
    
        return (
          
          <div className="row container" >
              <ToastContainer autoClose={3000}  />
            <div className="card  col-6 m-2 mb-1"  style={{width:'90%'}}>
              <h3>Create Robot Schedule</h3>
             
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div class="col">
                    <div className="row">
                    <div className="form-outline">
                      <label className="col-3 form-label m-1">Robot</label>
                      <select
                        className="col-5"
                        style={{marginLeft:'2%'}}
                        value={this.state.selectedRobot}
                        onChange={this.changeRobot}
                      >
                        <option defaultValue="">Select Robot</option>
                        {this.state.robotList.map((i) => {
                          return (
                            <option key={i.id} value={i.id}>
                              {i.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    </div>
         
                    <div className="row">
                    <div className="form-outline">
                      <label className="col-3 form-label m-1">Building</label>
                      <select
                        className="col-5"
                        style={{marginLeft:'2%'}}
                        value={this.state.selectedBuilding}
                        onChange={this.changeBuilding}
                      >
                        <option value="">Select Building</option>
                        {this.state.buildingList.map((i) => {
                          return (
                            <option key={i.name} value={i.id}>
                              {i.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-outline">
                      <label className="col-3 form-label m-1">Floor</label>
                      <select
                      style={{marginLeft:'2%'}}
                        className="col-5"
                        value={this.state.selectedFloor}
                        onChange={this.changeFloor}
                      >
                        <option value="">Select Floor</option>
                        {this.state.floorList.map((i) => {
                          return (
                            <option key={i.id} value={i.id}>
                              {i.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="form-outline">
                      <label className="col-3 form-label m-1" >Room</label>
                      <select
                        className="col-5"
                        style={{marginLeft:'2%'}}
                        value={this.state.selectedRoom}
                        onChange={this.changeRoom}
                      >
                        <option value="">Select Room</option>
                        {this.state.roomList.map((i) => {
                          return (
                            <option key={i.id} value={i.id}>
                              {i.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-outline">
                      <label className="form-label col-3 m-2">Start Date</label>
                
                      <DateTimePicker
                        selected={this.state.startDate}
                        onChange={this.changeStartDate}
                        value={this.state.startDate}
                        className="reactDateTimePicker"
                        clearAriaLabel="aria-label"
                        maxDetail="minute"
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                         />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-outline">
                      <label className="form-label col-3 m-2">End Date</label>
                      <DateTimePicker
                        selected={this.state.endDate}
                        onChange={this.changeEndDate}
                        value={this.state.endDate}
                        className="reactDateTimePicker"
                        clearAriaLabel="aria-label"
                        maxDetail="minute"
                        minDate={this.state.minDate}
                        maxDate={this.state.maxDate}
                         />
                    </div>
                    </div> 
                       <div className="row ">           
                <button type="submit" className="col-2 float-right btn btn-primary btn-sm m-2">
                  Create
                </button>
                <button type="reset" className="col-2 float-right btn btn-primary btn-sm m-2">
                  Reset
                </button>
                </div>
                    </div>

                    <div class="col">

                    <div id="product-image">
                     <img
                className="img-fluid col-8"
                src={this.state.imageUrl}/>
                </div>     
                 </div>
                 
                </div>
              
              </form>
            </div>
         
       
            <div className="card row m-2" style={{width:'90%'}}>
            <h3>Robot Schedule Status</h3>
           <table className="table table-hover table-striped ">
                    <thead>
                        <th>ROBOT</th>
                        <th>BUILDING </th>
                        <th>FLOOR </th>
                        <th>ROOM </th>
                        <th>START DATE</th>
                        <th>END DATE</th>
                        <th>STATUS</th>
                    </thead>
                    <tbody>
                 
                        {Array.isArray(this.state.scheduleList) && this.state.scheduleList.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data.robotName}</td>
                                    <td>{data.buildingName}</td>
                                    <td>{data.floorName}</td>
                                    <td>{data.roomName}</td>
                                    <td>{data.startDateTime}</td>
                                    <td>{data.endDateTime}</td>
                                    <td style={{color:'green'}}>{data.statusName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 
          
            </div>
          </div>

          
          
        );
      }
    }
    
 
export default RobotSchedule;