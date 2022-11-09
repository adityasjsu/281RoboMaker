package com.project.robot.model;

import org.springframework.stereotype.Component;

@Component
public class Billing {
	
	private Integer billingId;
	private Integer simulationId;
	private Integer userId;
	private String robotName;
	private Double amount;
	private Double duration;
	private String createdDate;
	private String createdBy;
	private String updatedDate;
	private String updatedBy;
	
	
	
	
	public Double getDuration() {
		return duration;
	}
	public void setDuration(Double duration) {
		this.duration = duration;
	}

	public Integer getBillingId() {
		return billingId;
	}
	public void setBillingId(Integer billingId) {
		this.billingId = billingId;
	}
	public Integer getSimulationId() {
		return simulationId;
	}
	public void setSimulationId(Integer string) {
		this.simulationId = string;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getRobotName() {
		return robotName;
	}
	public void setRobotName(String robotName) {
		this.robotName = robotName;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

}
