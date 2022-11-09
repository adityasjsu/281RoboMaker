package com.project.robot.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import com.project.robot.model.Robot;
import com.project.robot.model.RobotSchedule;
import com.project.robot.model.StatusCount;
import com.project.robot.model.UserRobot;

@Repository
public class RobotRepository {
	
	private final String GET_SCHEDULE ="select * from robot_schedule where robot_id=:robotId";
	
	private final String INSERT_SCHEDULE ="insert into "
			+ "robot_schedule(robot_id,building_id,floor_id,room_id,start_date,"
			+ "end_date,created_by,created_date,is_active,schedule_status,status_id) "
			+ "values (:robotId,:buildingId,:floorId,:roomId,:startDate,:endDate,"
			+ ":createdBy,:createdDate,:isActive,:scheduleStatus,:statusId)";
	
	private final String GET_SCHEDULE_BY_USERID ="select s.status_name,u.robot_name,r.start_date,r.end_date ,b.building_name,f.floor_name,ro.room_name,r.created_by,r.created_date from \n"
			+ "user_robot u  join robot_schedule r\n"
			+ "on u.robot_id=r.robot_id\n"
			+ "join status s on r.status_id=s.status_id\n"
			+ "join building b on b.building_id=r.building_id\n"
			+ "join floors f on r.building_id=f.building_id and r.floor_id = f.floor_id\n"
			+ "join room ro on r.building_id=f.building_id and r.floor_id = f.floor_id and r.room_id=ro.room_id\n"
			+ "where u.user_id=:userId and r.is_active='Y'";
	
	private final String DOES_SCHEDULE_EXIST ="select count(*) from \n"
			+ " robot_schedule r where \n"
			+ " r.is_active='Y' \n"
			+ "and r.start_date=:startDate and r.end_date=:endDate \n"
			+ "and r.robot_id=:robotId\n"
			+ "and r.schedule_status=1 \n"
			+ "and r.status_id=1";
	
	private final String GET_ROBOT="select ur.robot_id, ur.user_id,robot_name,"
			+ "first_name,last_name,email,(select status_name from status where status_id=ur.status_id)\n"
			+ "as statusName from \n"
			+ "user_robot ur left join user u on ur.user_id=u.user_id";
	
	
	private final String GET_STATUS_COUNT = "\n"
			+ "select sub.statusName,count(sub.statusName) as statusCount from (select robot_id,(select status_name from status where status_id=ur.status_id)\n"
			+ "as statusName from \n"
			+ "user_robot ur join\n"
			+ " user u\n"
			+ " on ur.user_id=u.user_id)sub group by sub.statusName ";
	
	
	private final String INSERT_ROBOT ="insert into robot (robot_name,robot_type,"
			+ "operation_system,version,x_loc,y_loc,z_loc,manufacturer_name,is_active)\n"
			+ "values (:robotName,:robotType,:os,:version,:xLoc,:yLoc,:zLoc,:manuName,'Y')";

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
			  // robotSchedule.setBuildingId(rs.getInt("schedule_status"));
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
	
	
	public List<RobotSchedule> getAllRobotSchedulesByUserId(int userId){
		Map<String,Integer> parameters = new HashMap<>();
		parameters.put("userId", userId);
		
		List<RobotSchedule> schedules=  namedparameterjdbctempalte.query(GET_SCHEDULE_BY_USERID, parameters,new RowMapper<RobotSchedule>() {
			public RobotSchedule mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
			   RobotSchedule robotSchedule = new RobotSchedule();
			   robotSchedule.setRobotName(rs.getString("robot_name"));
			   robotSchedule.setStatusName(rs.getString("status_name"));
			   robotSchedule.setBuildingName(rs.getString("building_name"));
			   robotSchedule.setFloorName(rs.getString("floor_name"));
			   robotSchedule.setRoomName(rs.getString("room_name"));
			   robotSchedule.setCreatedBy(rs.getString("created_by"));
			   robotSchedule.setCreatedDate(rs.getString("created_date"));
			   robotSchedule.setEndDateTime(rs.getString("end_date"));
			   robotSchedule.setStartDateTime(rs.getString("start_date"));
			   
			  
				return robotSchedule;
		}});
		
		return schedules;
	}
	
	public boolean doesScheduleExists(RobotSchedule schedule){
		Map<String,Object> parameters = new HashMap<>();
		
		parameters.put("robotId", schedule.getRobotId());
		parameters.put("startDate",schedule.getStartDateTime());
		parameters.put("endDate",schedule.getEndDateTime());
		Integer count =  namedparameterjdbctempalte.queryForObject(DOES_SCHEDULE_EXIST, parameters,Integer.class); 
		
		return count!=null && count>0? true: false;
	}
	
	
	public void saveSchedule (RobotSchedule schedule,int userId) {
		SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("buildingId", schedule.getBuildingId())
                .addValue("floorId", schedule.getFloorId())
                .addValue("roomId", schedule.getRoomId())
                .addValue("startDate", schedule.getStartDateTime())
                .addValue("endDate", schedule.getEndDateTime())
                .addValue("createdBy", userId)
                .addValue("createdDate", LocalDateTime.now())
		 		.addValue("robotId", schedule.getRobotId())
				.addValue("scheduleStatus", 1)
				.addValue("statusId", 1)
				.addValue("isActive", "Y");
                
		namedparameterjdbctempalte.update(INSERT_SCHEDULE, parameters) ;
	}
	
	
	

	public List<UserRobot> getRobots (int userId) {
		List<UserRobot> robots=  namedparameterjdbctempalte.query(GET_ROBOT,new RowMapper<UserRobot>() {
			public UserRobot mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
			   UserRobot robot = new UserRobot();
			  robot.setRobotName(rs.getString("robot_name"));
			  robot.setStatus(rs.getString("statusName"));
			  robot.setEmail(rs.getString("email"));
			  robot.setUserName(rs.getString("first_name")+" "+rs.getString("last_name"));

				return robot;
		}});
		
		return robots;
	}
	
	public List<StatusCount> getStatusCount (int userId) {
		List<StatusCount> statusCounts=  namedparameterjdbctempalte.query(GET_STATUS_COUNT,new RowMapper<StatusCount>() {
			public StatusCount mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
				StatusCount status = new StatusCount();
				status.setName(rs.getString("statusName"));
				status.setCount(rs.getInt("statusCount"));
				return status;
		}});
		

		return statusCounts;
	}

	public void saveRobot (Robot robot) {
		SqlParameterSource parameters = new MapSqlParameterSource()
                .addValue("robotName", robot.getRobotName())
                .addValue("robotType", robot.getRobotType())
                .addValue("os", robot.getOs())
                .addValue("version", robot.getVersion())
                .addValue("xLoc", robot.getxLoc())
                .addValue("yLoc", robot.getyLoc())
                .addValue("zLoc", robot.getzLoc())
		 		.addValue("manuName", robot.getManuName());
			
		namedparameterjdbctempalte.update(INSERT_ROBOT, parameters) ;
	}
	
	
}
