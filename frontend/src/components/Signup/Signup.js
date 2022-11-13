
import React, { Component } from "react";

import "./Signup.css";
import axios from "axios";
import LoginHeader from "../Login/Header/LoginHeader";
import config from '../../config.json';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: "",
        lastName:"",
        phoneNumber: "",
        countryCode: "",
        roleId: 0,
      custEmail: "",
      custPasswd: "",
      userId: 0,
      phoneNumber:"",
      countryCode:0,
      signUpDone: false,
      roleId:0
     
    };
  }
  firstNameChanged = e => {
    const name = e.target.value;
    this.setState({
      firstName: name
    });
  };
  lastNameChanged = e => {
    const name = e.target.value;
    this.setState({
      lastName: name
    });
  };
  custEmailChanged = e => {
    const email = e.target.value;
    this.setState({
      custEmail: email
    });
  };
  custPasswordChanged = e => {
    const passwd = e.target.value;
    this.setState({
      custPasswd: passwd
    });
  };
  custPhnNumberChanged=e=>{
    const phnNumber=e.target.value;
    this.setState({
      phoneNumber: phnNumber
    });
  }
countryCodeChanged  =e=>{
    const countryCode=e.target.value;
    this.setState({
      countryCode: countryCode
    });
  }
  signUp = e => {
    //var headers = new Headers();
    //headers.append("Access-Control-Allow-Credential",true);
    e.preventDefault();
    const signupDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.custEmail,
      password: this.state.custPasswd,
      phoneNumber:this.state.phoneNumber,
      countryCode:this.state.countryCode
    };
    console.log(signupDetails);
    console.log(config.backEndURL)
    
    axios
      .post(config.backEndURL+"/signup", signupDetails)
      .then(response => {
          console.log(response);
        console.log("Status Code : ", response.status);
        if (response.status === 201) {
          console.log(response);
          const userDetails={
            userId: response.data.userId,
            firstName: response.data.firstName,
            lastName:response.data.lastName,
            custEmail:response.data.email,
            loginUserId:response.data.email,
            phoneNumber:response.data.mobileNo,
            countryCode:response.data.countryCode,
            roleId:response.data.roleId,
            signUpDone: true,
          
           
         
          }
          sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
          this.setState({
            signUpDone: true,
            userId: response.data.userId,
            
          });
        } else {
          this.setState({
            signUpDone: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        
        this.setState({
          signUpDone: false,
         // errorMsg: error.response.data.errorDesc
        });
      });
  };

  render() {
   if (this.state.signUpDone) {
     
      const userDetails = {
        userId: this.state.userId,
        custName: this.state.custName,
        email:this.state.custEmail,
        loginUserId:this.state.custEmail,
        phoneNumber:this.state.phoneNumber,
        countryCode:this.state.countryCode
      
      };
      this.props.history.push({
        pathname: "/home",
        userDetails: {
        email: this.state.custEmail,
          userId: this.state.userId,
          firstName: this.state.firstName,
          lastName:this.state.lastName,
          phoneNumber: this.state.mobileNo,
          countryCode: this.state.countryCode,
          roleId:this.state.roleId
        }
      });
     
    }
    // let emailAndPasswd = null;
    // if (this.state.lastName.length > 0) {
    //   emailAndPasswd = (
    //     <div className="signup-email-passwd">
    //      <strong>Email address</strong>
    //       <input
    //         type="email"
    //         name="custEmail"
    //         placeholder="Email"
    //         className="signup-email"
    //         onChange={this.custEmailChanged}
    //       ></input>
    //       Here's my <strong>password</strong>
    //       <input
    //         type="password"
    //         name="custPasswd"
    //         placeholder="Password"
    //         onChange={this.custPasswordChanged}
    //       ></input>
    //       Here's my <strong>Country Code</strong>
    //       <select name="countryCodes" value={this.state.countryCode} onChange={this.countryCodeChanged}>
    //       <option value="0">Select Country Code </option>
    //         <option value="1">United States(+1)</option>
    //         <option value="2">India(+91)</option>
    //       </select>
    //       <br/>
    //       Here's my <strong>Phone Number</strong>
      
    //        <input
    //         type="text"
    //         name="phoneNumber"
    //         placeholder="Phone Number"
    //         onChange={this.custPhnNumberChanged}
    //       ></input>

    //       <button className="signup-btn" type="submit">
    //         Sign me up
    //       </button>
    //     </div>
    //   );
    // }
    // 
    return (
        
          <div className="main-container">
            <LoginHeader />
            <form onSubmit={this.signUp}>
              <div className="signup-container">
               
                <div className="signup-content">
                  <h2>Introduce Yourself</h2>
                  <div > <strong> First Name</strong></div>

                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={this.firstNameChanged}
                  />
                   <div >  <strong>Last Name</strong></div>
                   <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={this.lastNameChanged}
                  />
                   <div className="signup-email-passwd">
         <strong>Email address</strong>
          <input
            type="email"
            name="custEmail"
            placeholder="Email"
            className="signup-email"
            onChange={this.custEmailChanged}
          ></input>
         <strong>Password</strong>
          <input
            type="password"
            name="custPasswd"
            placeholder="Password"
            onChange={this.custPasswordChanged}
          ></input>
         <strong>Country Code</strong>
         <br/>
          <select name="countryCodes" value={this.state.countryCode} onChange={this.countryCodeChanged}>
          <option value="0">Select Country Code </option>
            <option value="+1">United States(+1)</option>
            <option value="+91">India(+91)</option>
          </select>
          <br/>
         <strong>Phone Number</strong>
      
           <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={this.custPhnNumberChanged}
          ></input>

          <button className="signup-btn" type="submit">
            Sign me up
          </button>
        </div>
                </div>
              </div>
            </form>
          </div>
    );
  }
}

export default Signup;
