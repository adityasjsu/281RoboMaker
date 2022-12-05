import React, { Component } from "react";
import "./Dashboard.css";
import axios from "axios";
import Logo from "./robotics.png"
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Tran from"./Trans1.jpg";
import Graph from"./graph1.jpg";
import Invoice from"./Invoice1.jpg";
import Customers from"./Customers1.jpg";

import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


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
        return(
            <Container>
                        <div className="card-header text-white bg-dark pt-14 pb-14 text-center center3 "><b>Admin Dashboard</b></div>
                {/* <h2>WELCOME to our Robot Management cloud system</h2> */}
                {this.state.userDetails.roleId==3 && <span>Access is needed. Please check after some time or please contact administrator</span>}
                    
                {/* <div className="dashboard">
                    {this.state.userDetails.roleId==3 && <span>Access is needed. Please check after some time or please contact administrator</span>}
                    <img
                    src={Logo}/>
                </div> */}
            
            </Container>
            
        );
    }
    else{

    return(
        <Container>
                    <div className="card-header text-white bg-dark pt-14 pb-14 text-center center3 "><b>Admin Dashboard</b></div>
            {/* <h2>WELCOME to our Robot Management cloud system</h2> */}
            {this.state.userDetails.roleId==3 && <span>Access is needed. Please check after some time or please contact administrator</span>}
                
            {/* <div className="dashboard">
                {this.state.userDetails.roleId==3 && <span>Access is needed. Please check after some time or please contact administrator</span>}
                <img
                src={Logo}/>
            </div> */}

    <Container>
    <div className="slide-container" color=" #7386d5"
background= "#fff "  >
    <Fade >
    <div className="each-fade">
        <img src={Tran} width="1000" height="450" />
    </div>
    <div className="each-fade">
        <img src={Customers} width="1000" height="450" />
    </div>
    <div className="each-fade">
        <img src={Invoice} width="1000" height="450"  />
    </div>
    {/* <div className="each-fade">
        <img src={Graph} width="1000" height="450"  />
    </div> */}
    </Fade>
</div>
</Container>

    {/* <div className="logo center6 ">
        <img src={Tran} width="1000" height="450"  /> 
    </div> */}


    <div class="center7">       
    <form action="https://dashboard.stripe.com/test/payments">
        <button className="btn btn-dark button center7" type="submit"  >View Payement History</button>
    </form>
    </div>
    
            
            
        </Container>
        
    );

}
}
}


export default Dashboard;