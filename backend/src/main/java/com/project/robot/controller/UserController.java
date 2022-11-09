package com.project.robot.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.robot.beans.AssignRoleReq;
import com.project.robot.beans.LoginRequest;
import com.project.robot.beans.SignupRequest;
import com.project.robot.model.User;
import com.project.robot.service.UserServiceI;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserServiceI userService;

	@PostMapping("/login")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

		try {
			User user = userService.validateLogin(loginRequest);
			if (user != null) {
				return new ResponseEntity<>(user, HttpStatus.OK);
			}
		} catch (Exception e) {

		}
		return null;
	}

	@PostMapping("/signup")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {

		try {
			System.out.println(new ObjectMapper().writeValueAsString(signupRequest));
			User user = new User();
			user.setFirstName(signupRequest.getFirstName());
			user.setLastName(signupRequest.getLastName());
			user.setEmail(signupRequest.getEmail());
			user.setUserPassword(signupRequest.getPassword());
			user.setMobileNo(signupRequest.getPhoneNumber());
			user.setCountryCode(signupRequest.getCountryCode());
			user.setRoleId(3);
			user.setCreatedDate(LocalDateTime.now());
			user.setCreatedBy(signupRequest.getFirstName());
			User createdUser = userService.createUser(user);

			if (createdUser != null) {
				return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
			}
		} catch (Exception e) {
		}

		return null;
	}

	@GetMapping("/usersWithNoRoles")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public ResponseEntity<?> getUsersWithNoRoles() {
		List<User> usersList = userService.getUsersWihNoRoles();
		return new ResponseEntity<>(usersList, HttpStatus.OK);
	}

	@PutMapping("/assignRole")
	@CrossOrigin(origins = "*", allowedHeaders = "*")
	public ResponseEntity<?> assignRole(@RequestBody AssignRoleReq assignRoleReq) {

		try {
			User user = userService.getUser(assignRoleReq.getUserId());
			if (user != null) {
				user.setRoleId(assignRoleReq.getRoleId());
				User updatedUser = userService.updateUser(user);
				return new ResponseEntity<>(updatedUser, HttpStatus.OK);
			}
		} catch (Exception e) {
		}
		return null;
	}
}
