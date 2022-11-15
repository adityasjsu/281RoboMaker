import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
//import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import RobotSchedule from "./components/RobotSchedule/RobotSchedule";
import Navigation from "./components/navigation/navigation";
import Robot from "./components/Robot/robot.js";
import Simulations from "./components/Simulation/simulatons";
import Billing from "./components/Billing/Billing";

import Admin from "./components/Billing/admin";
import User from "./components/Billing/user";

class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        {/* /* <Route path="/" component={LandingPage} exact /> */}
        <Route path="/Signup" component={Signup} exact />
        <Route path="/" component={Login} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/home" component={HomePage} exact />
        <Route path="/schedule" component={RobotSchedule} exact />
        <Route path="/navigation" component={Navigation} exact />
        <Route path="/robot" component={Robot} exact />
        <Route path="/simulations" component={Simulations} exact />
        <Route path="/billing" component={Billing} exact />
        <Route path="/billing/admin" component={Admin} exact />
        <Route path="/billing/user" component={User} exact />
        {/* 
        <Route path="/appRegistration" component={AppRegistration} exact />
        <Route path="/home" component={HomePage} exact /> */}
      </div>
    );
  }
}
export default Main;
