import React, { Component } from "react";
import axios from "axios";
import "./Login.css";
import LoginHeader from "./Header/LoginHeader";
import { Form, Container, Alert, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "./logo.png"
import "font-awesome/css/font-awesome.css";

import config from '../../config.json';
class Login extends Component {
  constructor(props) {
      console.log('asdf')
    super(props);
    this.state = {
      loginUserId: "",
      loginPassword: "",
      loginSuccessful: false,
      userId: "",
      firstName: "",
      lastName:"",
      phoneNumber: "",
      countryCode: "",
      roleId: 0,
    
    };
  }
  loginIdChanged = e => {
    const loginEmail = e.target.value;
    this.setState({
      loginUserId: loginEmail
    });
  };
  passwordChanged = e => {
    const loginPasswd = e.target.value;
    this.setState({
      loginPassword: loginPasswd
    });
  };
  checkAuthentication = e => {
       
    var headers = new Headers();
    headers.append("Access-Control-Allow-Credential",true);
    e.preventDefault();
    const loginDetails = {
      userEmail: this.state.loginUserId,
      userPassword: this.state.loginPassword
    };
    //axios.defaults.withCredentials = true;
    console.log(loginDetails);
    console.log(config.backEndURL)
    //axios.defaults.withCredentials = true;

    
    axios
      .post(config.backEndURL + "/login", loginDetails,headers)
      
      .then(response => {
        console.log("Status Code : ", response.status);
        console.log(response);
        // sessionStorage.setItem("userId", response.data.userId);
        //sessionStorage.setItem("userName", response.data.userName);
        if (response.status === 200 && response.data.userId !=null) {
          console.log("the response data is : " + response.data.userId);
          this.setState({
            loginSuccessful: true,
            userId: response.data.userId,
            firstName: response.data.firstName,
            lastName:response.data.lastName,
            phoneNumber: response.data.mobileNo,
            countryCode: response.data.countryCode,
            roleId:response.data.roleId
            
          });
        
        } else {
          alert("Please enter valid user name and password")
          this.setState({
            loginSuccessful: false
          });
     }
       })
      .catch(error => {
      //  console.log(error.response);
        //alert(error.response.data.desc)
        this.setState({
          loginSuccessful: false,
         // errorMsg: error.response.data.desc
        });
      });
  };

  render() {

    if (this.state.loginSuccessful) {
     
      const userDetails = {
        email: this.state.loginUserId,
        userId: this.state.userId,
        firstName: this.state.firstName,
        lastName:this.state.lastName,
        phoneNumber: this.state.mobileNo,
        countryCode: this.state.countryCode,
        roleId:this.state.roleId
      };

      sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
      this.props.history.push({
        pathname: "/home",
        userDetails: {
        email: this.state.loginUserId,
          userId: this.state.userId,
          firstName: this.state.firstName,
          lastName:this.state.lastName,
          phoneNumber: this.state.mobileNo,
          countryCode: this.state.countryCode,
          roleId:this.state.roleId

        }
      });
    }
    //console.log(this.state.loginSuccessful);
    return (
    
      <div className="main-container">
        <LoginHeader />
        
        

        <form onSubmit={this.checkAuthentication}>
            <div className="login-container">
            
              {/* <img
                height="200"
                width="200"
                className="login-img"
                alt=""
                src={}
              /> */}
              <div className="login-content">
                <h2 style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>WELCOME TO </h2>
                <img  height="200"
                width="240"
                 src={Logo}/>
                 <br></br>
                 <br></br>
                 <h2 style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>Developed by Group 17 </h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="d-flex justify-content-start">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={this.loginIdChanged}
                autoFocus
              />
            </Form.Group>
                {/* <div className="login-email-label">Email address</div>
                <input
                  type="email"
                  name="email"
                  data-testid="email-test"
                  placeholder="Email"
                  onChange={this.loginIdChanged}
                  required
                /> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="d-flex justify-content-start">
                Password
                <Container className="d-flex justify-content-end">
                  <a class="d-flex justify-content-start" href="/">
                    Forgot Password?
                  </a>
                </Container>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
            
                onChange={this.passwordChanged}
              />
            </Form.Group>
                {/* <div className="login-email-label">Password</div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.passwordChanged}
                  required
                /> */}

                <button className="signup" type="submit">User Login</button>
                
                <button className="signup" type="submit">Admin Log </button>
                

              {/* <span style={{ color: "white" }}>or</span> */}
              
              </div>
            </div>
        </form>
      </div>
    );
  }
}
export default Login;

