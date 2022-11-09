package com.project.robot.model;



public class Chart {
	
	private String date;
	private int amount;
	
	public Chart(String date, int amount) {
		this.date = date;
		this.amount = amount;
	}
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int d) {
		this.amount = d;
	}

}
