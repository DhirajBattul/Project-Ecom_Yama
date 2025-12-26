package com.practice.project_ecom.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.practice.project_ecom.exception.ProductNotFoundException;
import com.practice.project_ecom.model.Order;
import com.practice.project_ecom.model.OrderItem;
import com.practice.project_ecom.model.Product;
import com.practice.project_ecom.model.DTO.OrderItemRequest;
import com.practice.project_ecom.model.DTO.OrderItemResponse;
import com.practice.project_ecom.model.DTO.OrderRequest;
import com.practice.project_ecom.model.DTO.OrderResponse;
import com.practice.project_ecom.repo.OrderRepo;
import com.practice.project_ecom.repo.ProductRepo;



@Service
public class OrderService {

    private final ProductService productService;
	@Autowired
	private ProductRepo productRepo;
	
	@Autowired
	private OrderRepo orderRepo;


    OrderService(ProductService productService) {
        this.productService = productService;
    }
	
	
	public OrderResponse placeOrder(OrderRequest request) {
		
		Order order=new Order();
		String orderId="Or"+ UUID.randomUUID().toString().substring(0,8).toUpperCase();
		order.setOrderId(orderId);
		order.setCustomerName(request.customerName());
		order.setEmail(request.email());
		order.setStatus("Placed Successfully");
		order.setOrderDate(LocalDate.now());
		
		List<OrderItem> orderItems=new ArrayList<>();
		
		for(OrderItemRequest itemReq: request.items()) {
			Product product=productRepo.findById(itemReq.productId()).orElseThrow(() -> new ProductNotFoundException("Prodcut not found"));
			
			product.setStockQuantity(product.getStockQuantity()-itemReq.quantity());
			
			productRepo.save(product);
			
			OrderItem orderItem= new OrderItem()
					.setProduct(product)
					.setQuantity(itemReq.quantity())
					.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(itemReq.quantity())))
					.setOrder(order);
			
			orderItems.add(orderItem);
		}
		
		order.setOrderItems(orderItems);
		Order savedOrder=orderRepo.save(order);
		
		List<OrderItemResponse> itemResponses= new ArrayList<>();
		
		for(OrderItem item: order.getOrderItems()) {
			OrderItemResponse orderItemResponse=new OrderItemResponse(
					item.getProduct().getName(),
					item.getQuantity(),
					item.getTotalPrice());
			
			itemResponses.add(orderItemResponse);
		}
		
		OrderResponse orderResponse=new OrderResponse(savedOrder.getOrderId(),
				savedOrder.getCustomerName(),
				savedOrder.getEmail(),
				savedOrder.getStatus(),
				savedOrder.getOrderDate(),
				itemResponses
				);
		
		return orderResponse;
		
	}
//	@Transactional(readOnly=true)
//	public List<OrderResponse> getAllOrdersResponses() {
//		List<Order> orders=orderRepo.findAll();
//		List<OrderResponse> orderResponses=new ArrayList<>();
//		
//		for(Order order: orders) {
//			
////			List<OrderItemResponse> itemResponses= new ArrayList<>();
////			
////			for(OrderItem item :order.getOrderItems()) {
////				OrderItemResponse orderItemResponse=new OrderItemResponse(
////						item.getProduct().getName(),
////						item.getQuantity(),
////						item.getTotalPrice());
////				itemResponses.add(orderItemResponse);
////						
////			}
//			
//
//			
//			OrderResponse orderResponse= new OrderResponse(
//					order.getOrderId(),
//					order.getCustomerName(),
//					order.getEmail(),
//					order.getStatus(),
//					order.getOrderDate(),
//					itemResponses);
//			
//			orderResponses.add(orderResponse);
//		}
//		
//		
//		return orderResponses;
//	}
	@Transactional(readOnly=true)
	public List<OrderResponse> getAllOrdersResponses(){
		return orderRepo.findAll().stream()
				.map(order -> new OrderResponse(
						order.getOrderId(),
						order.getCustomerName(),
						order.getEmail(),
						order.getStatus(),
						order.getOrderDate(),
						
						order.getOrderItems().stream()
						.map(item -> new OrderItemResponse(
								item.getProduct().getName(),
								item.getQuantity(),
								item.getTotalPrice()
								))
						.toList()
						))
				.toList();
	}
	


}
