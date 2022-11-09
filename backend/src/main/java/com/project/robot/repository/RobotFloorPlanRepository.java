package com.project.robot.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.project.robot.model.Building;
import com.project.robot.model.Floor;
import com.project.robot.model.RobotSchedule;
import com.project.robot.model.Room;

@Repository
public class RobotFloorPlanRepository {

	
	public static final String query ="SELECT r.room_id,r.building_id,\n"
			+ "r.floor_id,r.room_name,(select building_name from building b where b.building_id=r.building_id) as buildingName,\n"
			+ "(select floor_name from floors where floor_id=r.floor_id) as floorName FROM ROOM r where is_active='Y'";
	
	public static final String GET_BUILDING = "Select * from building where is_active = 'Y'";
	

	public static final String GET_FLOORS = "Select * from floors where is_active = 'Y' and building_id = :buildingId";
	
	public static final String GET_ROOMS = "Select * from room where is_active='Y' and building_id=:buildingId and floor_id=:floorId";
	@Autowired
	NamedParameterJdbcTemplate namedparameterjdbctempalte;
	

	
	public List<Building> getBuildings(){

		
		List<Building> buildings=  namedparameterjdbctempalte.query(GET_BUILDING,new RowMapper<Building>() {
			public Building mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
				Building building = new Building();
				building.setBuildingId(rs.getInt("building_id"));
				building.setBuildingName(rs.getString("building_name"));		 
				return building;
		}});
		
		return buildings;
	}
	
	
	public List<Floor> getFloors(int buildingId){
		Map<String,Integer> parameters = new HashMap();
		parameters.put("buildingId", buildingId);
		
		List<Floor> floors=  namedparameterjdbctempalte.query(GET_FLOORS, parameters,new RowMapper<Floor>() {
			public Floor mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
				Floor floor = new Floor();
				floor.setFloorId(rs.getInt("floor_id"));
				floor.setFloorName(rs.getString("floor_name"));		 
				return floor;
		}});
		
		return floors;
	}
	
	public List<Room> getRooms(int buildingId, int floorId){
		Map<String,Integer> parameters = new HashMap();
		parameters.put("buildingId", buildingId);
		parameters.put("floorId", floorId);
		
		List<Room> rooms=  namedparameterjdbctempalte.query(GET_ROOMS, parameters,new RowMapper<Room>() {
			public Room mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
				Room room = new Room();
				room.setRoomId(rs.getInt("room_id"));
				room.setRoomName(rs.getString("room_name"));		 
				return room;
		}});
		
		return rooms;
	}
}
