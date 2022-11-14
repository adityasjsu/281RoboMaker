import React, { Component } from "react";
import Header from "./Header/Header";
import "./HomePage.css";
import { Link, Route } from "react-router-dom";
//import Dashboard from "../Dashboard/Dashboard";
import LeftSideBar from "./LeftSideBar/LeftSideBar";

//import { Switch } from "@material-ui/core";
import { Redirect } from "react-router";
//import cookie from "react-cookies";
//import { connect } from "react-redux";

import { BrowserRouter, HashRouter } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

//import MyProfile from "../MyProfile/MyProfile";
//import Metrics from "../Metrics/Metrics";
import config from '../../config.json';
import RobotSchedule from "../RobotSchedule/RobotSchedule";
import RobotDetails from "../RobotDetails/RobotDetails"
import ManageRobot  from "../ManageRobot/ManageRobot";
import AccessManagement from "../AccessManagement/AccessManagement"
import Dashboard from "../Dashboard/Dashboard";
import Robot from "../Robot/robot";
import Navigation from "../navigation/navigation";
import Billing from "../Billing/Billing";
import Admin from "../Billing/admin";
import User from "../Billing/user";
//import MyApplications from "../MyApplications/MyApplications";
class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      loggedIn: true,
      userDetails: this.props.location.userDetails,
      // appPodDtls: [],
      // appPodDtlsLoaded: false

    };
  }
  logOut = loggedin => {
    console.log("logged in", loggedin);
    console.log(this.state.loggedIn);
    this.setState({
      loggedIn: loggedin
    });

  };
  componentWillMount() {
    console.log('will mount')
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    this.setState({
      userDetails: userDetails
    });



  }

  async componentDidMount() {

    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    if (userDetails != null)
      this.setState({
        userDetails: userDetails
      })
    const appPodDtls = await this.getAppPodDtls(userDetails.custId);
    console.log('appPodDtls', appPodDtls)
    this.setState({
      appPodDtls: appPodDtls,
      appPodDtlsLoaded: true
    });

  }


  componentDidUpdate(prevProps, prevState) {
    console.log('component updated')
  }

  changeduserDetails = (newDetails) => {
    console.log('changed cust details', newDetails)
    const userDetails = this.state.userDetails;
    console.log(newDetails.updateduserDetails.currencyId)
    userDetails.custPhoneNumber = newDetails.updateduserDetails.custPhoneNumber;
    userDetails.countryCode = newDetails.updateduserDetails.countryCode;
    userDetails.custName=newDetails.updateduserDetails.custName;
    userDetails.image=newDetails.updateduserDetails.image;
    this.setState({
      userDetails: userDetails
    })


    console.log('final userDetails:', userDetails)
    sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
  }

  fetchedProfDtls = (updatedProfDtls) => {
    console.log('updatedProfDtls', updatedProfDtls);
    const profDtls = updatedProfDtls.profDtls;
    this.props.saveProfDtls({ profDtls })
    this.setState({
      profDtls: profDtls
    })

  }
  getAppPodDtls = () => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

      axios
        .get(
          config.backEndURL + "/users/custAppDtls/" +
          this.state.userDetails.custId
        )
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log(response);
            //if(response.data.length>0){


            sessionStorage.setItem("appPodDtls", JSON.stringify(response.data));
            return resolve(response.data);

          }
        })
        .catch(error => {
          console.log(error.response);

        });
    })
  }



  render() {
    let header = null;
    if (!this.state.loggedIn) {
      console.log("redirect");
  //    cookie.remove("cookie");
      sessionStorage.clear();
      return <Redirect to="/login" />;
    } else
      return (
        <HashRouter>
          <div>
            <Header userDetails={this.state.userDetails} loggedIn={this.state.loggedIn} logOut={this.logOut} />
            <div className="grid-container">
              <div className="left-side">
                <LeftSideBar
                  userDetails={this.state.userDetails}
                />
              </div>
              <div className="center-area">

              <Route
                  path="/"
                  render={props => (
                    <Dashboard userDetails={this.state.userDetails}/>
                  )}
                  exact
                />
              <Route
                  path="/assignRoles"
                  render={props => (
                    <AccessManagement userDetails={this.state.userDetails}/>
                  )}
                  exact
                />
               
              <Route
                  path="/schedule"
                  render={props => (
                    <RobotSchedule/>
                  )}
                  exact
                />
                  <Route
                  path="/robots"
                  render={props => (
                    <RobotDetails/>
                  )}
                  exact
                />
                 <Route
                  path="/manage-robots"
                  render={props => (
                    <ManageRobot/>
                  )}
                  exact
                />
                    <Route
                  path="/simulations"
                  render={props => (
                    <Robot/>
                  )}
                  exact
                />
                    <Route
                  path="/navigation"
                  render={props => (
                    <Navigation/>
                  )}
                  exact
                />

              <Route
                  path="/billing/user"
                  render={props => (
                    <User/>
                  )}
                  exact
                />
                 <Route
                  path="/billing/admin"
                  render={props => (
                    <Admin/>
                  )}
                  exact
                />
                </div>
              {/* <div className="center-area">
                <Route path="/"
                  render={props => (this.state.appPodDtlsLoaded &&
                    <Dashboard {...props}
                      userDetails={this.state.userDetails}
                      appPodDtls={this.state.appPodDtls}
                    />)}

                  exact />
                <Route
                  path="/metrics"
                  render={props => (
                    <Metrics/>
                  )}
                  exact
                />
                <Route
                  path="/myapplications"
                  render={props => (
                    <MyApplications
                      {...props}
                      userDetails={this.state.userDetails}
                      appPodDtls={this.state.appPodDtls}

                    />
                  )}
                  exact
                />

                <Route
                  path="/myprofile"
                  render={props => (
                    <MyProfile
                      {...props}
                      userDetails={this.state.userDetails}
                      userDetailsUpdated={this.changeduserDetails}

                    />
                  )}
                  exact
                />

              </div> */}

            </div>
          </div>
        </HashRouter>
      );
  }
}




export default HomePage;
