package com.project.robot.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.project.robot.model.RobotSchedule;

@Repository
public class RobotScheduleRepository {
	
	private final String GET_SCHEDULE ="select * from robot_schedule where robot_id=:robotId";
	
	@Autowired
	NamedParameterJdbcTemplate namedparameterjdbctempalte;
	
	
	public List<RobotSchedule> getSchedules(int robotId){
		Map<String,Integer> parameters = new HashMap();
		parameters.put("robotId", robotId);
		
		List<RobotSchedule> schedules=  namedparameterjdbctempalte.query(GET_SCHEDULE, parameters,new RowMapper<RobotSchedule>() {
			public RobotSchedule mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
			   RobotSchedule robotSchedule = new RobotSchedule();
			   robotSchedule.setFloorId(rs.getInt("floor_id"));
			   robotSchedule.setBuildingId(rs.getInt("building_id"));
			   robotSchedule.setCreatedBy(rs.getString("created_by"));
			   robotSchedule.setCreatedDate(rs.getString("created_date"));
			   robotSchedule.setEndDateTime(rs.getString("start_date"));
			   robotSchedule.setStartDateTime(rs.getString("end_date"));
			   robotSchedule.setUpdatedBy(rs.getString("updated_by"));
			   robotSchedule.setUpdatedDate(rs.getString("updated_date"));
			   robotSchedule.setRoomId(rs.getInt("room_id"));
			  
				return robotSchedule;
		}});
		
		return schedules;
	}
	
	
	
}
