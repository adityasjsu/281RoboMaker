import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import config from '../../config.json';
const columns = [
  
  { field: 'id1', headerName: 'Robot Name', width: 150 },
  {
    field: 'start',
    headerName: 'Start Time',
    width: 200,
    editable: true,
  },

  {
    field: 'end',
    headerName: 'End Time',
    width: 200,
    editable: true,
  },
];


class UserTable4 extends React.Component{
  
    state={robots:[], simulations:[],billing:[]}
    componentDidMount(){
    this.fetchCats()
    }
    fetchCats=async()=>{
      const url=config.backEndURL+ "/billing/user/simulation/1";
      const response=await fetch(url);
      const data=await response.json();
      this.setState({simulations:data})
   }
  render(){
    var id  = 0;
    return (
      
      <div style={{ height: 300, width: '97%' }}>
        <div className="card-header text-white bg-info pt-2 pb-2 " style={{width: '97%' }}><b>Usage Details</b></div>
          <DataGrid
            rows={this.state.simulations.map((s=>{
              id += 1
              return{
                id: id,
                id1: s.robotName,
                start: s.startDate,
                end:s.endDate,
              }
          }))}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[5]}
          />
        </div>
    );
  }
  
}
export default UserTable4;
