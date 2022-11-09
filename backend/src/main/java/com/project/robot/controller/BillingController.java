package com.project.robot.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.robot.model.Billing;
import com.project.robot.model.Chart;
import com.project.robot.model.RobotSchedule;
import com.project.robot.model.RobotSimulation;
import com.project.robot.model.User;
import com.project.robot.model.UserRobot;
import com.project.robot.service.BillingService;
import com.project.robot.service.UserService;

@RestController
@RequestMapping("/billing")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BillingController {
	
	@Autowired
	BillingService billingService;
	@Autowired
	UserService userService;
	
	

	// User Table 3
	@GetMapping("/user/bill/{userId}")
    public List<Billing> getBillingDetails(@PathVariable("userId") final int userId) {
        return billingService.getBilling(userId); 
    }
	
	// Chart Table
	@GetMapping("/user/chart/{userId}")
	public List<Chart> getChart(@PathVariable("userId") final int userId) {
	      return billingService.getChart(userId); 
	}
	
	// User Table 3 [Pay]
	@GetMapping("/user/paybill/{billId}")
    public boolean payBill(@PathVariable("billId") final int billId) {
        return billingService.payBill(billId); 
    }
	
	// User Table 1
	@GetMapping("/user/robot/{userId}")
    public List<UserRobot> getRobotDetails(@PathVariable("userId") final int userId) {
		
        return billingService.getRobot(userId); 
        
    }
	
	// User Table 2
	@GetMapping("/user/simulation/{userId}")
    public List<RobotSimulation> getSimulationDetails(@PathVariable("userId") final int userId) {
        return billingService.getSimulation(userId);
    }
	
	// Admin Table 1
	@GetMapping("/admin/users")
    public List<User> getUserDetails() {
		
        return userService.getUsers(); 
        
    }
	
	// Admin Table 1 [Generate Bill]
	@GetMapping("/admin/bill/{userId}")
    public boolean generateBill(@PathVariable("userId") final int userId) throws AddressException, MessagingException, IOException, ParseException {
		
		return billingService.generateBill(userId);
        
    }
	
	
    

}


