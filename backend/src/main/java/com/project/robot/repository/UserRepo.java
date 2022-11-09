package com.project.robot.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.project.robot.model.User;

@Repository
public class UserRepo {
private final String GET_USER ="select * from user";
	
	@Autowired
	NamedParameterJdbcTemplate namedparameterjdbctempalte;
	
	
	public List<User> getUsers(){
		
		List<User> users=  namedparameterjdbctempalte.query(GET_USER,new RowMapper<User>() {
			public User mapRow(ResultSet rs,
                    int rowNum) throws SQLException {
		
			   User user = new User();
			   user.setUserId(rs.getInt("user_id"));
			   user.setFirstName(rs.getString("first_name"));
			   user.setLastName(rs.getString("last_name"));
			   user.setEmail(rs.getString("email"));
			   user.setMobileNo(rs.getString("mobile_no"));
			   user.setCountryCode(rs.getString("country_code"));
			   user.setRoleId(rs.getInt("role_id"));
			   user.setCreatedBy(rs.getString("created_by"));
			   //user.setCreatedDate(rs.getString("created_date"));
			   user.setUpdatedBy(rs.getString("updated_by"));
			   //user.setUpdatedDate(rs.getString("updated_date"));
			   
			   
				return user;
		}});
		
		return users;
	}

}
