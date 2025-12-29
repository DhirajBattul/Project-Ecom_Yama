package com.practice.project_ecom.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.practice.project_ecom.model.User;

public interface UserRepo extends JpaRepository<User,Integer>{
	
	
	User findByUsername(String username);

}
