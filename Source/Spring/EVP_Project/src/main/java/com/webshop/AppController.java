package com.webshop;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
	
	@Autowired
	private UserRepository repo;
	
	@GetMapping("/users")
	public List<User> all() {
		return repo.findAll();
	}
	
	@GetMapping("/users/{id}")
	User byId(@PathVariable Long id) {
	    return repo.findById(id).orElseThrow();
	  }
	
	@PutMapping("/users/{id}")
	User updateUser(@RequestBody User newUser, @PathVariable Long id) {
		return null;
	}
	
	@DeleteMapping("/users/{id}")
	  void deleteEmployee(@PathVariable Long id) {
	    
	  }
}
