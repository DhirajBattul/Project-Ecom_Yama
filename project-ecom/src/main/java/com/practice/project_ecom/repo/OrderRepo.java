package com.practice.project_ecom.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.practice.project_ecom.model.Order;

@Repository
public interface OrderRepo extends JpaRepository<Order,Integer>{
	Optional<Order> findByOrderId(String orderId);
}
