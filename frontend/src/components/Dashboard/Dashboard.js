import React, { Component } from "react";
import "./Dashboard.css";
import axios from "axios";
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
   
    userDetails:this.props.userDetails
    
        };
    }
    render(){
        let dashboardDtls;
        if(this.state.userDetails.roleId==3)
        {
            dashboardDtls=(<span>Access is needed. Please check after some time or please contact administrator</span>)
        }
        return(
            <div className="dashboard">
                {dashboardDtls}
            </div>
        );
    }
}
export default Dashboard;