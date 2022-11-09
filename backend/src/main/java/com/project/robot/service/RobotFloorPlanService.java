package com.project.robot.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.robot.model.Building;
import com.project.robot.model.Floor;
import com.project.robot.model.Room;
import com.project.robot.repository.RobotFloorPlanRepository;

@Service
public class RobotFloorPlanService {


	@Autowired
	RobotFloorPlanRepository repository;
	
	public List<Map<String,Object>> getBuildingFloorPlanData(){
		 List<Map<String,Object>> list = new ArrayList<>();
		List<Building> buildings = repository.getBuildings();
		Map<String,Object> map;
		
		for(Building b : buildings) {
			map= new HashMap<>();
			map.put("id",b.getBuildingId());
			map.put("name",b.getBuildingName());
			map.put("floors", getFloors(b.getBuildingId()));
			list.add(map);
		}
	

		return list;
	}
	
	
	public List<Map<String,Object>> getFloors(int buildingId){
		Map<String,Object> map ;
		List<Map<String,Object>> list = new ArrayList<>();
		List<Floor> floors = repository.getFloors(buildingId);
		for(Floor f : floors) {
			map= new HashMap<>();
			map.put("rooms", getRooms(f.getFloorId(),buildingId)); 
			map.put("id", f.getFloorId());
			map.put("name", f.getFloorName());
			list.add(map);
		}
		return list;
	}
	public List<Room> getRooms(int floorId,int buidlingId){
		
		return repository.getRooms(buidlingId,floorId);
	}
	
}
