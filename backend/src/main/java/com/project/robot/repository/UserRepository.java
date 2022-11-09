package com.project.robot.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.robot.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	@Query(value="select * from user where email=?1 and user_password=?2",nativeQuery = true)
	User validateLogin(String userEmail, String userPassword);
	
	@Query(value="select * from user where role_id=3",nativeQuery = true)
	List<User> getUsersWithNoRoles();

}
