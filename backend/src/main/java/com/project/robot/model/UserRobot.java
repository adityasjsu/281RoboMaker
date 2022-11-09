package com.project.robot.model;

import org.springframework.stereotype.Component;

@Component
public class UserRobot {
	private int userId;
	private int robotId;
	private String robotName;
	private String email;
	private String status;
	private String userName;
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getRobotId() {
		return robotId;
	}
	public void setRobotId(int robotId) {
		this.robotId = robotId;
	}
	public String getRobotName() {
		return robotName;
	}
	public void setRobotName(String robotName) {
		this.robotName = robotName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}
