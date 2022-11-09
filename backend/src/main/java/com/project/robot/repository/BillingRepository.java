package com.project.robot.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.project.robot.model.Billing;
import com.project.robot.model.Chart;
import com.project.robot.model.RobotSchedule;
import com.project.robot.model.RobotSimulation;
import com.project.robot.model.UserRobot;





@Repository
public class BillingRepository {
	
	private final String GET_BILLING = "select * from billing inner join robot_simulation on billing.simulation_id=robot_simulation.simulation_id where billing.user_id=:userId and billing.updated_by is NULL";
	private final String GET_EMAIL_FROM_ID = "select email from user where user_id=:userId";
	private final String GET_ROBOT = "select * from user_robot where user_id=:userId";
	private final String GET_ROBOT_SIMULATION = "select * from robot_simulation inner join robot on robot_simulation.robot_id=robot.robot_id where robot_simulation.robot_id=:robotId and robot_simulation.user_id=:userId";
	private final Double PRICE_PER_MIN = 1.0;
	private final String UPDATE_ROBOT_SIMULATION = "update robot_simulation set status_id=:statusId where simulation_id=:simulationId";
	private final String UPDATE_BILLING = "update billing set updated_by=:updatedBy where billing_id=:billingId";
	
	@Autowired
	NamedParameterJdbcTemplate namedparameterjdbctempalte;
	
	
	public List<Billing> getBilling(int userId){
		Map<String,Integer> parameters = new HashMap();
		parameters.put("userId", userId);
		
		List<Billing> bills=  namedparameterjdbctempalte.query(GET_BILLING, parameters,new RowMapper<Billing>() {
			public Billing mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
				
			   
			   Billing billing = new Billing();
			   billing.setBillingId(rs.getInt("billing.billing_id"));
			   billing.setUserId(rs.getInt("billing.user_id"));
			   billing.setSimulationId(rs.getInt("billing.simulation_id"));
			   billing.setAmount(rs.getDouble("billing.amount"));
			   billing.setRobotName(String.valueOf(rs.getInt("robot_simulation.robot_id")));
			   billing.setDuration(rs.getDouble("billing.duration"));
			   billing.setCreatedBy(rs.getString("billing.created_by"));
			   billing.setCreatedDate(rs.getString("billing.created_date"));
		
			   billing.setUpdatedBy(rs.getString("billing.updated_by"));
			   billing.setUpdatedDate(rs.getString("billing.updated_date"));
			  
				return billing;
		}});
		
		return bills;
	}
	
	public List<UserRobot> getUserRobots(int userId) {
		Map<String,Integer> parameters = new HashMap();
		parameters.put("userId", userId);
		
		List<UserRobot> robots=  namedparameterjdbctempalte.query(GET_ROBOT, parameters,new RowMapper<UserRobot>() {
			public UserRobot mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
	
				UserRobot robot = new UserRobot();
				robot.setUserId(rs.getInt("user_id"));
				robot.setRobotId(rs.getInt("robot_id"));
				robot.setRobotName(rs.getString("robot_name"));
				robot.setStatus(rs.getString("status_id"));
				//robot.setIsActive(rs.getString("is_active"));
				//robot.setCreatedBy(rs.getString("created_by"));
				//robot.setCreatedDate(rs.getString("created_date"));
		
				//robot.setUpdatedBy(rs.getString("updated_by"));
				//robot.setUpdatedDate(rs.getString("updated_date"));
			  
				return robot;
		}});
		
		return robots;
		
	}
	
	public List<Chart> getChart(int userId) {
		Map<String,Integer> parameters = new HashMap();
		parameters.put("userId", userId);
		List<Chart> charts = new ArrayList<Chart>();
		
		List<Billing> bills=  namedparameterjdbctempalte.query(GET_BILLING, parameters,new RowMapper<Billing>() {
			public Billing mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
				
			   
			   Billing billing = new Billing();
			   billing.setBillingId(rs.getInt("billing.billing_id"));
			   billing.setUserId(rs.getInt("billing.user_id"));
			   billing.setSimulationId(rs.getInt("billing.simulation_id"));
			   billing.setAmount(rs.getDouble("billing.amount"));
			   billing.setRobotName(String.valueOf(rs.getInt("robot_simulation.robot_id")));
			   billing.setDuration(rs.getDouble("billing.duration"));
			   billing.setCreatedBy(rs.getString("billing.created_by"));
			   billing.setCreatedDate(rs.getString("billing.created_date"));
		
			   billing.setUpdatedBy(rs.getString("billing.updated_by"));
			   billing.setUpdatedDate(rs.getString("billing.updated_date"));
			  
			   return billing;
		}});
		
		for (Billing bill: bills) {
			charts.add(new Chart(bill.getCreatedDate(), bill.getAmount().intValue()));
		}
		Collections.sort(charts, new Comparator<Chart>() {
		    public int compare(Chart lhs, Chart rhs) {
		    	return lhs.getDate().compareTo(rhs.getDate());
		    }
		});
		return charts;
		
	}
	
	public List<RobotSimulation> getRobotSimulation(int userId){
		
		List<UserRobot> robots = this.getUserRobots(userId);
		
		List<RobotSimulation>  all = new ArrayList<RobotSimulation>();
		for (UserRobot userRobot: robots) {
			
			Map<String,Integer> parameters = new HashMap();
			parameters.put("robotId", userRobot.getRobotId());
			parameters.put("userId", userRobot.getUserId());
			
			List<RobotSimulation> simulation =  namedparameterjdbctempalte.query(GET_ROBOT_SIMULATION, parameters,new RowMapper<RobotSimulation>() {
				public RobotSimulation mapRow(ResultSet rs,
	                    int rowNum) throws SQLException {
				
					RobotSimulation s = new RobotSimulation();
					s.setSimulationId(rs.getInt("robot_simulation.simulation_id"));
					s.setScheduleId(rs.getInt("robot_simulation.schedule_id"));
					s.setUserId(rs.getInt("robot_simulation.user_id"));
					s.setRobotId(rs.getInt("robot_simulation.robot_id"));
					s.setRobotName(rs.getString("robot.robot_name"));
					
					
					
					
					s.setStartDate(rs.getString("robot_simulation.start_date"));
					s.setEndDate(rs.getString("robot_simulation.end_date"));
					s.setScheduleStatus(rs.getString("robot_simulation.schedule_status"));
					s.setIsActive(rs.getString("robot_simulation.is_active"));
					s.setStatusId(rs.getString("robot_simulation.status_id"));
					
					s.setCreatedBy(rs.getString("robot_simulation.created_by"));
					s.setCreatedDate(rs.getString("robot_simulation.created_date"));
			
					s.setUpdatedBy(rs.getString("robot_simulation.updated_by"));
					s.setUpdatedDate(rs.getString("robot_simulation.updated_date"));
				  
					return s;
			}});
			all.addAll(simulation);
			
		}
		return all;
		
	}
	
	public boolean payBill(int billId) {
		
		SqlParameterSource parameters = new MapSqlParameterSource()
				.addValue("updatedBy", "user")
				.addValue("billingId", billId);
		KeyHolder holder = new GeneratedKeyHolder();
		namedparameterjdbctempalte.update(
				UPDATE_BILLING,
				parameters, holder
		);
		return true;
		
	}
	
	public boolean generateBilling(int userId) throws ParseException{
		List<RobotSimulation>  simulations = getRobotSimulation(userId);
		String timeStamp = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		String insertStatement = "INSERT INTO billing (simulation_id, user_id, amount, duration, created_date) VALUES (:sid, :uid,:amt,:dur,:cd)";
	
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);
	    
		boolean generated = false;
		for (RobotSimulation simulation: simulations) {
			if(simulation.getStatusId().equals("0")) {
				continue;
			}
			generated = true;
			KeyHolder holder = new GeneratedKeyHolder();
			
			Date firstDate = sdf.parse(simulation.getStartDate());
		    Date secondDate = sdf.parse(simulation.getEndDate());
		    long diffInMillies = Math.abs(secondDate.getTime() - firstDate.getTime());
		    double duration = ((diffInMillies * 1.0)/(1000.0 * 60.0));
		    long l = (new Double(duration)).longValue();
			SqlParameterSource parameters = new MapSqlParameterSource()
					.addValue("sid", simulation.getSimulationId())
					.addValue("uid", userId)
					.addValue("amt", l)
					.addValue("dur", l)
					.addValue("cd", simulation.getEndDate());
			namedparameterjdbctempalte.update(
				    insertStatement,
				    parameters, holder
				);
			SqlParameterSource parameters2 = new MapSqlParameterSource()
					.addValue("statusId", "0")
					.addValue("simulationId", simulation.getSimulationId());
			namedparameterjdbctempalte.update(
					UPDATE_ROBOT_SIMULATION,
				    parameters2, holder
				);
		
		}
		return generated;
	}
	
	public String getEmailFromId(int userId) {
		Map<String,Integer> parameters = new HashMap();
		parameters.put("userId", userId);
		
		List<String> emails=  namedparameterjdbctempalte.query(GET_EMAIL_FROM_ID, parameters,new RowMapper<String>() {
			public String mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
				
				
			   String email = rs.getString("email");
			   return email;
		}});
		
		return emails.get(0);
		
	}

}
