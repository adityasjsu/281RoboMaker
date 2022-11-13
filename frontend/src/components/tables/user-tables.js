import React from 'react';
import UserTable2 from './user-table2'
import UserTable4 from './user-table4';
import UserTable6 from './user-table6';
import AdminTable from "./admin-table"
import BarChart from "../charts/bar"


class Table extends React.Component{
	render(){
		return(
			<div className="pt-5 mr-5">
				<div class="row">
					<div class="col-lg-6 col-md-6">
						<div class="margin-left">
							<UserTable2/>
						</div>
					</div>
					<div class="col-lg-6 col-md-6">
						<div class="margin-bottom ">
							<UserTable4/>
						</div>
					</div>
				</div>
                                <div class="row"><br/><br/></div>

                                <div class="pt-5 margin-left" ><BarChart/></div>
				<div class="pt-5 margin-left" ><UserTable6/></div>
			</div>
			
			


			)

	}
}
export default Table
