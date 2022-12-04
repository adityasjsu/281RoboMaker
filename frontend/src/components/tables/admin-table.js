import * as React from 'react';
import emailjs from "emailjs-com";
//import { DataGrid } from '@mui/x-data-grid';
import {
  DataGrid, GridColDef, GridCellParams, GridToolbar,
} from '@material-ui/data-grid';
import {
  TreeList, SearchPanel, Column, Lookup,
} from 'devextreme-react/tree-list';
import config from '../../config.json';
import ContactUs from "./testemail";
import { Container } from '@material-ui/core';

const masterDetail = true;


const generateBill=(params)=> {
   const url=config.backEndURL + "/billing/admin/bill/" + params.row.id;
   var x = fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => {
       if(responseJSON) {
         //alert("Bill Generated for " + params.row.firstName + " " + params.row.lastName + ". An email has been sent to " + params.row.email)
      const response = window.confirm("Are you sure you want to Genrate Bill?");

      if (response) {
        alert("Bill Generated for " + params.row.firstName + " " + params.row.lastName + ". An email has been sent to " + params.row.email)
      } else {
      console.log("Cancel was pressed");
      }
       }
       else {

        alert("No new bill to generate for " + params.row.firstName + " " + params.row.lastName + "!")
       }
       
    });
   
}


const columns = [
  {
    field: 'bill',
    headerName: 'Generate Invoice',
    width: 190,
      renderCell: (params: GridCellParams) => (
      <button className="btn btn-dark button" onClick={(e) => { generateBill(params); }} >Generate Invoice</button>
      
    ),
},
  { field: 'id', headerName: 'ID', width: 140 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 200,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 200,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true,
  },
  {
    field: 'countryCode',
    headerName: 'Area Code',
    width: 200,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Contact number',
    width: 220,
    editable: true,
  },
  
  

];

class AdminTable extends React.Component{
  state={users:[]}
  componentDidMount(){
    this.fetchUsers()
    }
    fetchUsers=async()=>{
      const url=config.backEndURL + "/billing/admin/users";
      const response=await fetch(url,{method: 'GET'});
      const data=await response.json();
      this.setState({users:data})
   }
 
  render(){
    return (
      <div style={{ height: 500, width: '100%' }}>

<div className="card-header bg-dark text-white pt-2 pb-2 text-center " style={{ width: '99%' }}><b>Send a reminder Email</b></div>
    <Container>

    <div class="pt-5 margin-left"  ><ContactUs/></div>

    </Container>


    <div></div>


        <div className="card-header bg-dark text-white pt-2 pb-2 text-center " style={{ width: '99%' }}><b>Robo User List</b></div>
         <div className="card-body">{this.state.users.length === 0 && 'No users to show'}</div>
         
        <DataGrid id={Math.random()}
     
          rows={this.state.users.map((user=>{
            return{
              id: user.userId,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.mobileNo,
              countryCode: user.countryCode,
            }
          }))}
         
          columns={columns} 
           pageSize={15}
          rowsPerPageOptions={[15]}
          
        />

			</div>      
		
    );
  }
  
}

export default AdminTable;

