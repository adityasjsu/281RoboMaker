import React from 'react';
import UserTable2 from './user-table2'
import UserTable4 from './user-table4';
import UserTable6 from './user-table6';
import AdminTable from "./admin-table"
import BarChart from "../charts/bar"
import ContactUs from "./testemail";	
import { Container } from '@material-ui/core';


class Table extends React.Component{
	render(){
		return(
			<div>
			<div className="pt-5 mr-5">
				
                                <div class="row"><br/><br/></div>

								<div className="card-header text-white bg-dark pt-2 pb-2 text-center "><b>Billing Chart</b></div>

                                <div class="pt-5 margin-left" ><BarChart/></div>
								
				<div class="pt-5 margin-left" ><UserTable6/></div>
				

				{/* <div class="pt-5 margin-left" ><UserTable2/></div> */}
				{/* <div class="pt-5 margin-left" ><UserTable4/></div> */}
				</div>
				{/* <div>
				<Container>
				<div class="pt-5 margin-left" ><UserTable4/></div>
				</Container>
				</div> */}
				</div>


			)

	}
}
export default Table
