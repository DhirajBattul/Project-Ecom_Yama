package com.practice.project_ecom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.practice.project_ecom.model.User;
import com.practice.project_ecom.model.UserPrincipal;
import com.practice.project_ecom.repo.UserRepo;



@Service
public class MyUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserRepo repo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user= repo.findByUsername(username);
		
		if(user == null) {
			System.out.println("user 404");
			throw new UsernameNotFoundException("User 404");
		}
		 
		 
		return new UserPrincipal(user);
	}
	
	
	
	

}

