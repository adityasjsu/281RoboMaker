package com.project.robot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.robot.model.RobotSchedule;
import com.project.robot.repository.RobotScheduleRepository;

@Service
public class RobotScheduleService {
	
	@Autowired
	RobotScheduleRepository repository;

	public List<RobotSchedule> getRobotSchedules(int robotId){
		return repository.getSchedules(robotId);
	}
}
