import React, { Component, useState } from "react";
import "font-awesome/css/font-awesome.css";
import axios from "axios";
import config from '../../config.json';
import { useHistory } from 'react-router-dom';

function Card(props) {
  const [user, setProduct] = useState(props.product);
  const history = useHistory();
  const assignAdminRole = (e)=>{
    assignRole(user.userId,1);
    history.push("/");
   
  }
  const assignUserRole = (e)=>{
    assignRole(user.userId,2);
    history.push("/");
    // navigate( "/productPage/" + product._id);
  }
  const assignRole = (userId,roleId) => {
    let roleName="Admin";
    if(roleId===2) roleName="Client";

    const assgnRole=window.confirm("Do you want the user to be "+roleName+"?");
    if(assgnRole){
    const assignRoleReq = {
      adminUserId: 1,
      userId: userId,
      roleId:roleId
    };
    axios
      .put(config.backEndURL+"/assignRole", assignRoleReq)
      .then(response => {
        console.log("Status Code : ", response.status);
        alert("Successfully confgiured role to the user");
        if (response.status === 200) {
          console.log(response.data);
          const users = this.state.users;
          const deleteUserIndex = users.findIndex(
            user => (user.userId === userId)
          );
          console.log(deleteUserIndex)
          if (deleteUserIndex !== -1){
            const changedRole=users[deleteUserIndex];
            users.splice(deleteUserIndex, 1);
          this.setState({
            users: users
          });
        }
        }
      })
      .catch(error => {
        console.log(error.response);
        // this.setState({
        //   signUpDone: false,
        //   errorMsg: error.response.data.errorDesc
      });
    }
  };
  
  return (
    <div className="card m-2" style={{
      
      alignItems: 'center',
      justifyContent: 'center',

    }}>

      <div className="card-body">
        
        {/* <img src="https://picsum.photos/id/1010/200" alt="Customer" /> */}
        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Customer" width="200" height="200"/>
        <div>
          {/* Product Id is {product.id} */}
          {/* <span className="pull-right hand-icon">
            <i className="fa fa-times"></i>
          </span> */}
        </div>
        <h5 className="pt-2"> Name :{user.firstName} {user.lastName}</h5>
        <div>Email Id : {user.email} </div>
        <div>Mobile No : {user.mobileNo} </div>
        {/* <div>Available Quantity : {product.quantity}</div> */}
      </div>
      <div className="card-footer">
          <div><button className="btn btn-primary" onClick={assignAdminRole} >Assign Admin</button> {"   "}
          <button className="btn btn-primary" onClick={assignUserRole} >Assign Client</button><br /><br />
        </div>
      </div>
    </div>
  );
}

export default Card;
