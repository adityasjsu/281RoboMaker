package com.project.robot.service;

import java.util.List;

import com.project.robot.beans.LoginRequest;
import com.project.robot.model.User;

public interface UserServiceI {

	public User validateLogin(LoginRequest loginRequest);

	public User createUser(User user);

	public User getUser(int userId);

	public User updateUser(User user);

	public List<User> getUsersWihNoRoles();
	public List<User> getUsers();
}
