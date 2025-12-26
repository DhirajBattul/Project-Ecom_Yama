package com.practice.project_ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.practice.project_ecom.model.DTO.OrderRequest;
import com.practice.project_ecom.model.DTO.OrderResponse;
import com.practice.project_ecom.service.OrderService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/orders/place")
	public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest orderRequest){
		OrderResponse orderResponse=orderService.placeOrder(orderRequest);
		return new ResponseEntity<>(orderResponse,HttpStatus.CREATED);
	}
	
	@GetMapping("/orders")
	public ResponseEntity<List<OrderResponse>> getAllOrders(){
		List<OrderResponse> orders=orderService.getAllOrdersResponses();
		return new ResponseEntity<>(orders,HttpStatus.OK);
		
	}
} 
