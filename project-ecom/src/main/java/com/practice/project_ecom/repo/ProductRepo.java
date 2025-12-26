package com.practice.project_ecom.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.practice.project_ecom.model.Product;



@Repository
public interface ProductRepo extends JpaRepository<Product,Integer>{
	
	
	@Query("SELECT p FROM Product p WHERE " +
	           "LOWER(p.name) LIKE CONCAT('%', LOWER(:keyword), '%') OR " +
	           "LOWER(p.brand) LIKE CONCAT('%', LOWER(:keyword), '%') OR " +
	           "LOWER(p.description) LIKE CONCAT('%', LOWER(:keyword), '%') OR " +
	           "LOWER(p.category) LIKE CONCAT('%', LOWER(:keyword), '%')")
	List<Product> searchProducts(String keyword);
	
	
}
