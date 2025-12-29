package com.practice.project_ecom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.practice.project_ecom.model.User;
import com.practice.project_ecom.repo.UserRepo;



@Service
public class UserService {
	
	@Autowired
	UserRepo repo;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	
	public User saveUser(User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		
		return repo.save(user);
	}
}