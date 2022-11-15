package com.project.robot.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.project.robot.model.Robot;
import com.project.robot.model.RobotSchedule;
import com.project.robot.model.StatusCount;
import com.project.robot.model.UserRobot;
import com.project.robot.repository.RobotRepository;

@Service
public class RobotService {
	
	@Autowired
	RobotRepository repository;

	public List<RobotSchedule> getRobotSchedules(int robotId){
		return repository.getSchedules(robotId);
	}
	
	public String saveSchedule(RobotSchedule schedule, int userId) {
		 if(!doesScheduleExist(schedule)) {
			 repository.saveSchedule(schedule,userId);	
			 return "Schedule Created Successfully";
		 }else {
			 return "Schedule Already Exists";
		 } 
		 
	}
	
	private boolean doesScheduleExist(RobotSchedule schedule) {
		return repository.doesScheduleExists(schedule);
	}
	
	public List<RobotSchedule> getAllRobotSchedulesByUserId(int userId){
		return repository.getAllRobotSchedulesByUserId(userId);
	}
	
	
	public List<UserRobot> getAllRobotsByUserId(int userId){
		return repository.getRobots(userId);
	}
	
	public List<StatusCount> getStatusCount (int userId) {	
		int total=0;
		List<StatusCount> list = repository.getStatusCount(userId);
		for(StatusCount c : list) {
			total+=c.getCount();
		}
		list.add(new StatusCount("TOTAL",total));
		return list;
	}
	
	public void saveRobot (Robot robot, Integer userId) {
		 int newRobotId = repository.saveRobot(robot);
		 //List<RobotSchedule> robotId = repository.getSchedules(newRobotId);
		 robot.setRobotId(newRobotId);
		 repository.saveUserRobot(robot, userId);
	}
}
