import * as React from 'react';
import useForceUpdate from 'use-force-update';
import config from '../../config.json';
// import { DataGrid } from '@mui/x-data-grid';
import {
  DataGrid, GridColDef, GridCellParams, GridToolbar,
} from '@material-ui/data-grid';

const payBill=(params)=> {
  
  console.log(params.row.id)
  const url=config.backEndURL+"/billing/user/paybill/" + params.row.id;
  var x = fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => {
       if(responseJSON) {
         alert("Bill paid for invoice number: " + params.row.id)

         window.location.reload();
       }
       else {
        alert("Error in paying bill!")
       }
       
    });
  
  //const response=fetch(url);
  //alert("Bill Generated for " + params.row.firstName + " " + params.row.lastName + ". An email has been sent to " + params.row.email)
}

const columns = [
  { field: 'id', headerName: 'Invoice No.', width: 120 },
  {
    field: 'name',
    headerName: 'Robot ID',
    width: 130,
    editable: true,
  },
  {
    field: 'duration',
    headerName: 'Run(mins)',
    width: 150,
    editable: true,
  },
  
  {
    field: 'price',
    headerName: 'Price(min)',
    width: 150,
    editable: true,
  },

  {
    field: 'amount',
    headerName: 'Amount(USD)',
    width: 150,
    editable: true,
  },
  {
    field: 'created_date',
    headerName: 'Bill Date',
    width: 200,
    editable: true,
  },
  {
    field: 'pay',
    headerName: 'Payment',
    width: 150,
      renderCell: (params: GridCellParams) => (
      <button className="btn btn-info button" onClick={(e) => { payBill(params); }} >Pay</button>

    ),
  },

];

class UserTable6 extends React.Component{
  state={users:[]}
  componentDidMount(){
    this.fetchUsers()
    }
    fetchUsers=async()=>{
      const url=config.backEndURL+"/billing/user/bill/1";
      const response=await fetch(url,{method: 'GET'});
      const data=await response.json();
      console.log(data);
      console.log("####")
      this.setState({users:data})
   }
 
  render(){
    var total = 0;
    return (
      <div style={{ height: 600, width: '93%' }}>
        <div className="card-header text-white bg-info pt-2 pb-2 "><b>Invoices</b></div>
        <DataGrid id={Math.random()}
          rows={this.state.users.map((user=>{
            total += user.duration
            return{
              id: user.billingId,
              name: user.robotName,
              duration: user.duration,
              price: "1.0",
              amount: "USD " + user.duration,
              created_date: user.createdDate,
            }
          }))}
          columns={columns}
          pageSize={4}
          rowsPerPageOptions={[5]}
        />
      <div><b>Total Pending Bill: USD {total}</b></div>
       
      
      </div>
    );
  }
  
}
export default UserTable6;
