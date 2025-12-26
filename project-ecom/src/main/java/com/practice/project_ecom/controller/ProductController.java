package com.practice.project_ecom.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.practice.project_ecom.model.Product;
import com.practice.project_ecom.service.ProductService;


@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {
	
	
	
	@Autowired
	private ProductService service;
	
	
	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProducts(){
		return new ResponseEntity<>(service.getAllProducts(),HttpStatus.OK) ;
		
	}
	
	@GetMapping("/product/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable int id) {
		
		Product product= service.getProductById(id);
		
         return new ResponseEntity<>(product,HttpStatus.OK);
	}
	
	
	@PostMapping("/product")
		public ResponseEntity<?> addProduct(@RequestPart Product product,@RequestPart MultipartFile imageFile) throws IOException{
			Product product1=service.addProduct(product,imageFile);
			
			return new ResponseEntity<>(product1,HttpStatus.OK);
	}
	
	
	@GetMapping("/product/{id}/image")
	public ResponseEntity<byte[]> getImageByProductId(@PathVariable int id){
		Product product=service.getProductById(id);
		byte[] imageFile=product.getImageData();
		
		return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(imageFile);
	}
	
	
	@PutMapping("/product/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable int id,@RequestPart Product product,
			@RequestPart(required=false) MultipartFile imageFile) throws IOException{
		Product product1=service.updateProduct(id,product,imageFile);
		
		return new ResponseEntity<>("Updated",HttpStatus.OK);
	}
	
	@DeleteMapping("/product/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable int id){
		Product product= service.getProductById(id);
		
		service.deleteProduct(id);
		
		return new ResponseEntity<>("Deleted",HttpStatus.OK);
	}
	
	@GetMapping("/products/search")
	public ResponseEntity<List<Product>> searchProduct(@RequestParam String keyword){
		List<Product> products= service.searchProducts(keyword);
		
		return new ResponseEntity<>(products,HttpStatus.OK);
	}
}
	

	




