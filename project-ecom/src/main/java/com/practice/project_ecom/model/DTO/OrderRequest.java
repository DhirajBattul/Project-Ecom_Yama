package com.practice.project_ecom.model.DTO;

import java.util.List;

public record OrderRequest(
		String customerName,
		String email,
		List<OrderItemRequest> items
		) {
	
	
}
