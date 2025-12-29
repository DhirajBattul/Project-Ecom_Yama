package com.practice.project_ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.practice.project_ecom.model.User;
import com.practice.project_ecom.service.JwtService;
import com.practice.project_ecom.service.UserService;



@RestController
//@CrossOrigin
public class UserController {
	
	@Autowired
	
	private UserService service;
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	JwtService jwtService;
	
	
	@PostMapping("/register")
	public String register(@RequestBody User user) {
		
		service.saveUser(user);
		return "Registered!!";
		
	}
	
	@PostMapping("/login")
	public String login(@RequestBody User user) {
		
		Authentication authentication= authenticationManager
										.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		
		if(authentication.isAuthenticated())
			return jwtService.generateToken(user.getUsername());
		else
			return "Login Failed";
	}
}