import React, { Component } from "react";
import "./Dashboard.css";
import axios from "axios";
import Logo from "./robotics.png"
import { Container } from "react-bootstrap";
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
            <Container>
                <h2>WELCOME to our Robot Management cloud system</h2>
                {this.state.userDetails.roleId==3 && <span>Access is needed. Please check after some time or please contact administrator</span>}
                    <img
                    src="https://www.nanalyze.com/app/uploads/2017/11/GAMMA2-Robots.jpg"/>
                {/* <div className="dashboard">
                    {this.state.userDetails.roleId==3 && <span>Access is needed. Please check after some time or please contact administrator</span>}
                    <img
                    src={Logo}/>
                </div> */}
            </Container>
            
        );
    }
}
export default Dashboard;