import React, { Component } from "react";
import Header from "./Header/Header";
import "./Billing.css";
import { Link, Route } from "react-router-dom";

import AdminTable from '../tables/admin-table';

import Table from "../tables/user-tables"


import { Redirect } from "react-router";


import { BrowserRouter, HashRouter } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";


import config from '../../config.json';
class User extends Component {
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
            
          <div className="mt-5 mr-5">
              <Table/>
            </div>


          </div>
        </div>
      </HashRouter>
    );
  }
}




export default User;
