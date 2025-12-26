package com.practice.project_ecom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {
	 @ExceptionHandler(ProductNotFoundException.class)
	    public ResponseEntity<?> handleProductNotFound(ProductNotFoundException ex) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                             .body(ex.getMessage());
	    }
	 
	 
	 @ExceptionHandler(ProductNotAddedException.class)
	 public ResponseEntity<?> handleProductNotAdded(ProductNotAddedException ex){
		 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
	 }
	 
}
