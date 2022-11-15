import React, { Component } from "react";
import "./Dashboard.css";
import axios from "axios";
import Logo from "./robotics.png"
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
   
    userDetails:this.props.userDetails
    
        };
    }
    render(){
        let dashboardDtls;
        let tp = (<h2>WELCOME to our Robot Management cloud system</h2>)
        if(this.state.userDetails.roleId==3)
        {
            dashboardDtls=(<span>Access is needed. Please check after some time or please contact administrator</span>)
        }
        return(
            <div className="dashboard">
                {tp}
                {dashboardDtls}
                <img
                 src={Logo}/>
            </div>
        );
    }
}
export default Dashboard;