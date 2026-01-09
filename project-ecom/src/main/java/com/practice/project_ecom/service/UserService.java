package com.practice.project_ecom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.practice.project_ecom.exception.UsernameAlreadyExistsException;
import com.practice.project_ecom.model.User;
import com.practice.project_ecom.repo.UserRepo;



@Service
public class UserService {
	
	@Autowired
	UserRepo repo;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	
	public User saveUser(User user) {
		
		try {
		user.setPassword(encoder.encode(user.getPassword()));
		
		return repo.save(user);
		} catch(DataIntegrityViolationException ex) {
			throw new UsernameAlreadyExistsException("Username already exists");
		
			
		}
	}
}