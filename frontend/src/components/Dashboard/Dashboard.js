import React, { Component } from "react";
import "./Dashboard.css";
import axios from "axios";
import Logo from "./robotics.png"
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

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

            <div className="App">
         </div>

            </Container>
            
        );
    }
}

// const YoutubeEmbed = ({ embedId }) => (
//     <div className="video-responsive center2">
//       <iframe
//         width="153"
//         height="180"
//         src={`https://www.youtube.com/embed/j0QntTKRCY4`}
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//         title="Embedded youtube"
//       />
//       </div>

    
//   );
  
//   YoutubeEmbed.propTypes = {
//     embedId: PropTypes.string.isRequired
//   };
  
export default Dashboard;