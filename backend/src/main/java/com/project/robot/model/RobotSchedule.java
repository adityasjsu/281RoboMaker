package com.project.robot.model;

import org.springframework.stereotype.Component;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Component
public class RobotSchedule {
	private Integer scheduleId;
	private Integer robotId;
	private String robotName;
	private String startDateTime;
	private String endDateTime;
	private Status status;
	private String statusName;
	private Boolean isActive;
	private int roomId;
	private String roomName;
	private int floorId;
	private String buildingName;
	private int buildingId;
	private String floorName;
	private String createdDate;
	private String createdBy;
	private String updatedDate;
	private String updatedBy;
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}

	public Integer getScheduleId() {
		return scheduleId;
	}
	public void setScheduleId(Integer scheduleId) {
		this.scheduleId = scheduleId;
	}
	public Integer getRobotId() {
		return robotId;
	}
	public void setRobotId(Integer robotId) {
		this.robotId = robotId;
	}
	public String getRobotName() {
		return robotName;
	}
	public void setRobotName(String robotName) {
		this.robotName = robotName;
	}
	public String getStartDateTime() {
		return startDateTime;
	}
	public void setStartDateTime(String startDateTime) {
		this.startDateTime = startDateTime;
	}
	public String getEndDateTime() {
		return endDateTime;
	}
	public void setEndDateTime(String endDateTime) {
		this.endDateTime = endDateTime;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public int getRoomId() {
		return roomId;
	}
	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public int getFloorId() {
		return floorId;
	}
	public void setFloorId(int floorId) {
		this.floorId = floorId;
	}
	public String getBuildingName() {
		return buildingName;
	}
	public void setBuildingName(String buildingName) {
		this.buildingName = buildingName;
	}
	public int getBuildingId() {
		return buildingId;
	}
	public void setBuildingId(int buildingId) {
		this.buildingId = buildingId;
	}
	public String getFloorName() {
		return floorName;
	}
	public void setFloorName(String floorName) {
		this.floorName = floorName;
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
	@Override
	public String toString() {
		return "RobotSchedule [scheduleId=" + scheduleId + ", robotId=" + robotId + ", robotName=" + robotName
				+ ", startDateTime=" + startDateTime + ", endDateTime=" + endDateTime + ", status=" + status
				+ ", isActive=" + isActive + ", roomId=" + roomId + ", roomName=" + roomName + ", floorId=" + floorId
				+ ", buildingName=" + buildingName + ", buildingId=" + buildingId + ", floorName=" + floorName
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + "]";
	}

	

}

