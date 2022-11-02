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
	private UserRepository userRepo;
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private OrdersRepository ordersRepo;
	@Autowired
	private BasketRepository basketRepo;
	@Autowired
	private OrderProductsRepository orderProductsRepo;
	@Autowired
	private ProductVariationsRepository productVariationsRepo;
	@Autowired
	private ProductImagesRepository productImagesRepo;
	@Autowired
	private ProductCategoryRepository productCategoryRepo;
	@Autowired
	private KeywordsRepository keywordsRepo;
	@Autowired
	private TokensRepository tokensRepo;
	@Autowired
	private ProductCategoriesRepository productCategoriesRepo;
	@Autowired
	private VariationsRepository variationsRepo;
	
	//User
	@GetMapping("/users")
	public List<User> allUser() {
		return userRepo.findAll();
	}
	
	@GetMapping("/users/{id}")
	User userById(@PathVariable Long id) {
	    return userRepo.findById(id).orElseThrow();
	  }
	
	@PutMapping("/users/{id}")
	User updateUser(@RequestBody User newUser, @PathVariable Long id) {
		return null;
	}
	
	@DeleteMapping("/users/{id}")
	  void deleteUser(@PathVariable Long id) {
	    
	  }
	
	
	//Product
	@GetMapping("/products")
	public List<Product> allProduct() {
		return productRepo.findAll();
	}
	
	@GetMapping("/products/{id}")
	Product ProductById(@PathVariable Long id) {
	    return productRepo.findById(id).orElseThrow();
	  }
	
	@PutMapping("/products/{id}")
	Product updateProduct(@RequestBody Product newProduct, @PathVariable Long id) {
		return null;
	}
	
	@DeleteMapping("/products/{id}")
	  void deleteProduct(@PathVariable Long id) {
	    
	  }
	
	
}
