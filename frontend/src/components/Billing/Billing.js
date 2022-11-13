import React, { Component } from "react";
import Header from "./Header/Header";
import "./Billing.css";
import { Link, Route } from "react-router-dom";
import User from "./user";


import { Redirect } from "react-router";


import { BrowserRouter, HashRouter } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";


import config from '../../config.json';
class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }




  render() {
    let header = null;

    return (
      <HashRouter>
        <div>
          {/* <Header userDetails={this.state.userDetails} loggedIn={this.state.loggedIn} logOut={this.logOut} /> */}
          <div className="">
            

<User/>

          </div>
        </div>
      </HashRouter>
    );
  }
}




export default Billing;
