
import React, { Component } from "react";
import axios from "axios";
import config from '../../config.json';
class AccessManagement extends Component{
constructor(props){
    super(props);
    this.state={
users:[],
userDetails:this.props.userDetails

    };
}
componentDidMount(){
this.fetchUsersWithNoRoles();
}
assignRole = (userId,roleId) => {
    let roleName="Admin";
    if(roleId===1) roleName="Client";

    const assgnRole=window.confirm("Do you want the user to be "+roleName+"?");
    if(assgnRole){
    const assignRoleReq = {
      adminUserId: this.state.userDetails.userId,
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
 
fetchUsersWithNoRoles=()=>{
    axios
    .get(config.backEndURL + "/usersWithNoRoles")
    
    .then(response => {
      console.log("Status Code : ", response.status);
      if(response.status===200){
     this.setState({
         users:response.data
     })
    }
     })
    .catch(error => {
    
    
    });
};

render(){
    let pendingRoles;
    if(this.state.users.length>0){
    
        pendingRoles=this.state.users.map((user, index) => {
            
              return (
                <div className="flex-item" key={user.userId}>
                  {/* onClick={() => this.props.groupExpDtls(userGroup.group_id)} */}
                  <span>{user.email}</span>
                  <button
                    className="adminRole"
                    onClick={() => {
                      this.assignRole(user.userId,2);
                    }}
                  >
                    Admin
                  </button>
                  <button
                    className="clientRole"
                    onClick={() => {
                      this.assignRole(user.userId,1);
                    }}
                  >
                    Client
                  </button>
                </div>
              );
            });
    }
    else
    pendingRoles="No Pending Role Assignment pending";
    return(
        <div className="roles-grid-container">
        <div className="pending-roles">
          <h2>Pending Roles to User</h2>
          <div className="flex-container">{pendingRoles}</div>
        </div>
     
      </div>
    );
    };
}
export default AccessManagement;