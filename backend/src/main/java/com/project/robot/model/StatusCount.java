package com.project.robot.model;

import org.springframework.stereotype.Component;

@Component
public class StatusCount {

	
	private String name;
	private int count;
	
	public StatusCount() {
		
	}
	public StatusCount(String name, int count) {
		super();
		this.name = name;
		this.count = count;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
	
	
}
