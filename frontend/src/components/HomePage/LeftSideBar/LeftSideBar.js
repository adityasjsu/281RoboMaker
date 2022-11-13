import React, { Component } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import "./LeftSideBar.css";
import DashboardIcon from '@material-ui/icons/Dashboard';


//import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'


class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {

      userDetails: this.props.userDetails,

    };

  }

  componentDidUpdate(prevProps) {

  }
  componentDidMount() {

  }


  render() {
    let roleMenu,adminMenu;
    if(this.state.userDetails.roleId===2){
      roleMenu=(
        <li>
        <NavLink to="/assignRoles" activeClassName="active" exact>
      
          <label className="ml-4" > Access Management</label>
        </NavLink>
      </li>
      
      )
    }
    if(this.state.userDetails.roleId===1){
      adminMenu=   <li>
      <NavLink to="/billing/admin" activeClassName="active">
        <span><i className="fa fa-bar-chart" style={{fontSize:'20px'}}></i></span>
        <label className="ml-4" > Billing</label>
      
      </NavLink>
    </li>
    }
    else
    adminMenu=   <li>
    <NavLink to="/billing/user" activeClassName="active">
      <span><i className="fa fa-bar-chart" style={{fontSize:'20px'}}></i></span>
      <label className="ml-4" > Billing</label>
    
    </NavLink>
  </li>
    //   if(this.state.userDetails.roleId===2){
    //     locationMenu=(
    //       <li>
    //       <NavLink to="/configureLocation" activeClassName="active" exact>
        
    //         <label className="ml-4" > Configure Location</label>
    //       </NavLink>
    //     </li>
        
    //     )
    // }  {locationMenu}
    return (

      <div className="left-side-bar">
        <div className="flex-container">
          <nav id="sidebar" style={{height:'1000px'}}>
                <ul class="list-unstyled components">
                    <li>
                      <NavLink to="/" activeClassName="active" exaact>
                    
                        <label className="ml-4" > Dashboard</label>
                      </NavLink>
                    </li>
                    <li>
                    <NavLink to="/schedule" activeClassName="active">
                        <span><i className="fa fa-bar-chart" style={{fontSize:'20px'}}></i></span>
                        <label className="ml-4" >Scheduling</label>
                      
                      </NavLink>
                      </li>
                      {adminMenu}
                    <li>
                      <NavLink to="/robots" activeClassName="active">
                        <span><i className="fa fa-tasks" style={{fontSize:'20px'}}></i> </span>
                        <label className="ml-4" > My Robots</label>
                      </NavLink>
                    </li>
                    {roleMenu}
                   
                    <li>
                        <NavLink to="/simulations" activeClassName="active">
                          <span><i style={{'font-size': '25px'}} className="fa fa-user"></i></span>
                           <label className="ml-4" > Simulation</label>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/navigation" activeClassName="active">
                          <span><i style={{'font-size': '25px'}} className="fa fa-user"></i></span>
                           <label className="ml-4" >Navigation</label>
                        </NavLink>
                    </li>
                </ul>
            </nav>
          </div>
        </div>
    );
  }
}
export default LeftSideBar;
