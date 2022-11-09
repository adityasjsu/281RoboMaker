package com.project.robot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.robot.model.Building;
import com.project.robot.model.Robot;
import com.project.robot.model.RobotSchedule;
import com.project.robot.model.StatusCount;
import com.project.robot.model.UserRobot;
import com.project.robot.service.RobotFloorPlanService;
import com.project.robot.service.RobotService;

@RestController
@RequestMapping("/robot")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RobotController {
	
	@Autowired
	RobotService robotService;
	
	@Autowired
	RobotFloorPlanService robotFloorPlanService;
	
	 @CrossOrigin("*")
	@GetMapping("/all")
    public List<UserRobot> getRobots(@RequestParam(name="id")  final int userId) {
        return robotService.getAllRobotsByUserId(userId);  
    }
	
	 @CrossOrigin("*")
	 @GetMapping("/count")
	 public List<StatusCount> getStatusCount(@RequestParam(name="id")  final int userId) {
	      return robotService.getStatusCount(userId);      
	    }
		

	@GetMapping("/schedule/{robotId}")
    public List<RobotSchedule> getRobotSchedule(@PathVariable("robotId") final int robotId) {
        return robotService.getRobotSchedules(robotId); 
        
    }
	
	@CrossOrigin("*")
	@PostMapping("/schedule") 
	public String saveSchedule(@RequestBody RobotSchedule schedule,@RequestParam(name="id")  final int userId) {	
		 //to do validation
		return robotService.saveSchedule(schedule,userId);
	}
	 
	 
	 @CrossOrigin(origins = "*")
	 @GetMapping("/schedule")
	 public List<RobotSchedule> getAllRobotSchedulesByUserId(@RequestParam(name="id") int userId){
		 System.out.println("UserId"+userId);
		 return robotService.getAllRobotSchedulesByUserId(userId);
	 }
	 
	 
	 @CrossOrigin("*")
	 @GetMapping("/floorplans")
	 
	 public List<Map<String,Object>> get(){
		 return robotFloorPlanService.getBuildingFloorPlanData();
	 }
	 
	 
	 @CrossOrigin("*")
	 @PostMapping("/save")
	 public void saveRobot(@RequestBody Robot robot){
		 
		  robotService.saveRobot(robot);
	 }
	
}
