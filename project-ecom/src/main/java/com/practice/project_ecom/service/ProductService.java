package com.practice.project_ecom.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.practice.project_ecom.ProjectEcomApplication;
import com.practice.project_ecom.exception.ProductNotFoundException;
import com.practice.project_ecom.model.Product;
import com.practice.project_ecom.repo.ProductRepo;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

    private final ProjectEcomApplication projectEcomApplication;
	
	@Autowired
	private ProductRepo repo;


    ProductService(ProjectEcomApplication projectEcomApplication) {
        this.projectEcomApplication = projectEcomApplication;
    }
	
	
	public List<Product> getAllProducts() {
		return repo.findAll();
	}


	public Product getProductById(int id) {
		return repo.findById(id).orElseThrow(() -> new ProductNotFoundException("Product not found of Id" +id));
	}


	public Product addProduct(Product product, MultipartFile imageFile) throws IOException{
		product.setImageName(imageFile.getOriginalFilename());
		product.setImageType(imageFile.getContentType());
		product.setImageData(imageFile.getBytes());
		return repo.save(product);
	}


	public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
		Product existingProduct = repo.findById(id).orElseThrow();
	    
	    // Update text fields
	    existingProduct.setName(product.getName());
	    existingProduct.setDescription(product.getDescription());
	    existingProduct.setBrand(product.getBrand());
	    
	    existingProduct.setPrice(product.getPrice()); 
	   
	    
	    existingProduct.setCategory(product.getCategory());
	    existingProduct.setReleaseDate(product.getReleaseDate());
	    existingProduct.setProductAvailable(product.isProductAvailable());
	    existingProduct.setStockQuantity(product.getStockQuantity());

	    // Only update image if a new one was provided
	    if (imageFile != null && !imageFile.isEmpty()) {
	        existingProduct.setImageName(imageFile.getOriginalFilename());
	        existingProduct.setImageType(imageFile.getContentType());
	        existingProduct.setImageData(imageFile.getBytes());
	    }
	    
	    return repo.save(existingProduct);
		
		
	}


	public void deleteProduct(int id) {
		repo.deleteById(id);		
	}

	@Transactional
	public List<Product> searchProducts(String keyword) {
		return repo.searchProducts(keyword);
	}


	
}
