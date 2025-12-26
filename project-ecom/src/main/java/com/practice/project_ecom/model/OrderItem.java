package com.practice.project_ecom.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity

public class OrderItem {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	private Product product;
	
	private int quantity;
	
	private BigDecimal totalPrice;
	
	@ManyToOne(fetch=FetchType.LAZY)
	private Order order;
	
	
	
	

	@Override
	public String toString() {
		return "OrderItem [id=" + id + ", product=" + product + ", quantity=" + quantity + ", totalPrice=" + totalPrice
				+ ", order=" + order + "]";
	}

	public OrderItem(int id, Product product, int quantity, BigDecimal totalPrice, Order order) {
		super();
		this.id = id;
		this.product = product;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.order = order;
	}

	public OrderItem() {
		super();
	}

	public int getId() {
		return id;
	}

	public OrderItem setId(int id) {
		this.id = id;
		return this;
	}

	public Product getProduct() {
		return product;
	}

	public OrderItem setProduct(Product product) {
		this.product = product;
		return this;
	}

	public int getQuantity() {
		return quantity;
	}

	public OrderItem setQuantity(int quantity) {
		this.quantity = quantity;
		return this;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public OrderItem setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
		return this;
	}

	public Order getOrder() {
		return order;
	}

	public OrderItem setOrder(Order order) {
		this.order = order;
		return this;
	}
	
	
}
