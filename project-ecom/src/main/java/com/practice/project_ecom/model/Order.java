package com.practice.project_ecom.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(unique=true)
	private String orderId;
	private String customerName;
	private String email;
	private String status;
	private LocalDate orderDate;
	
	@OneToMany(mappedBy="order",cascade=CascadeType.ALL)
	private List<OrderItem> orderItems;

	public Order(Long id, String orderId, String customerName, String email, String status, LocalDate orderDate,
			List<OrderItem> orderItems) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.customerName = customerName;
		this.email = email;
		this.status = status;
		this.orderDate = orderDate;
		this.orderItems = orderItems;
	}

	public Order() {
		super();
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", orderId=" + orderId + ", customerName=" + customerName + ", email=" + email
				+ ", status=" + status + ", orderDate=" + orderDate + ", orderItems=" + orderItems + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}

	public List<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}
	
	
	
}
