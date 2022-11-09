package com.project.robot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.robot.beans.LoginRequest;
import com.project.robot.model.User;
import com.project.robot.repository.UserRepository;

@Service
public class UserService implements UserServiceI {

	@Autowired
	private UserRepository userRepo;

	@Override
	public User validateLogin(LoginRequest loginRequest) {
		try {
			User user = userRepo.validateLogin(loginRequest.getUserEmail(), loginRequest.getUserPassword());
			return user;
		}

		catch (Exception e) {
		}
		return null;
	}

	@Override
	public User createUser(User user) {
		try {
			User createdUser = userRepo.save(user);
			return createdUser;
		}

		catch (Exception e) {
		}
		return null;
	}

	@Override
	public User getUser(int userId) {

		try {
			User user = userRepo.findById(userId).orElse(null);
			return user;
		} catch (Exception e) {
		}
		return null;
	}

	@Override
	public User updateUser(User user) {
		try {
			User updatedUser = userRepo.save(user);
			return updatedUser;
		}

		catch (Exception e) {
		}
		return null;
	}
	public List<User> getUsers(){
		return userRepo.findAll();
	}

	@Override
	public List<User> getUsersWihNoRoles() {
		try {
			List<User> userList=userRepo.getUsersWithNoRoles();
			return userList;
		}
		catch(Exception e) {}
		
		return null;
	}

}
