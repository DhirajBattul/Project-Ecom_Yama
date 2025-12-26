package com.practice.project_ecom.exception;

import org.springframework.web.bind.annotation.ResponseStatus;


public class ProductNotFoundException extends RuntimeException{
	public ProductNotFoundException(String message) {
		super(message);
	}
	
	public ProductNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}
