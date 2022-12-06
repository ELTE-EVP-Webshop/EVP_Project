package com.webshop;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webshop.responsemodels.MessageResponse;
import com.webshop.responsemodels.UserDeliveryInfoResponse;

import ch.qos.logback.core.net.ObjectWriter;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	
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
	
	//test
		@GetMapping("/testDebug")
		public String getDebug() {
			return "Szia :)";
		}
		
		@PostMapping("/addItemToBasket")
		public MessageResponse addItemToBasket(long productId,  int count) {
			MessageResponse response = new MessageResponse();
			UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Long userId = userDetails.getId();
			if(count < 1) {
				response.setMessage("A rendelt mennyiség nem lehet kisebb 1-nél!");
				return response;
			}
			try {
				Basket b = new Basket(userId, productId, count);
				if(basketRepo.save(b) != null) { response.setMessage("Tárgy sikeresen felvéve a korsárba!"); }
				else { response.setMessage("A tárgyat nem sikerült a kosárhoz adni!"); }
			}catch(Exception e){
				System.out.println(e.getMessage());
			}
			return response;
		}
		
		@DeleteMapping("/removeItemFromBasket")
		public MessageResponse removeItemFromBasket(long productId) {
			MessageResponse response = new MessageResponse();
			UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Long userId = userDetails.getId();
			try {
				List<Basket> userbasket = basketRepo.findAllByUserid(userId);
				boolean talalt = false;
				for (Basket b : userbasket) {
					if(b.getProduct_id() == productId) {
						basketRepo.delete(b);
						response.setMessage("A tárgy eltávolítva a kosárból!");
						talalt = true;
						break;
					}
				}
				if(!talalt) { response.setMessage("A felhasználó kosarában nem volt ilyen tárgy!"); }
			}catch(Exception e){
				response.setMessage("Hiba történt!");
			}
			return response;
		}
		
		@PostMapping("/updateProductCountInBasket")
		public MessageResponse removeItemFromBasket(long productId, int newCount) {
			MessageResponse response = new MessageResponse();
			UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Long userId = userDetails.getId();
			if(newCount < 1) {
				response.setMessage("A rendelt mennyiség nem lehet kisebb 1-nél!");
				return response;
			}
			try {
				List<Basket> userbasket = basketRepo.findAllByUserid(userId);
				boolean talalt = false;
				for (Basket b : userbasket) {
					if(b.getProduct_id() == productId) {
						b.setCount(newCount);
						basketRepo.save(b);
						response.setMessage("Sikeres módosítás!");
						talalt = true;
						break;
					}
				}
				if(!talalt) { response.setMessage("A felhasználó kosarában nem volt ilyen tárgy!"); }
			}catch(Exception e){
				response.setMessage("Hiba történt!");
			}
			return response;
		}
		
		@GetMapping("/getBasketProducts")
		public String getBasketProducts() {
			String response;
			UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Long userId = userDetails.getId();
			
			List<Basket> userBasket = basketRepo.findAllByUserid(userId);
			if(userBasket.size() > 0) {
				ObjectMapper mapper = new ObjectMapper();
				try {
					return mapper.writeValueAsString(userBasket);
				} catch (JsonProcessingException e) {
					e.printStackTrace();
					return "ERROR";
				}
			}else {
				return "Empty";
			}
		}
		
		@PostMapping("/updateDeliveryAddress")
		public MessageResponse updateDeliveryAddress(String phone, String country, String country_l, String city, short post_code, String street, String house_number, String post_other) {
			MessageResponse mr = new MessageResponse();
			UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Long userId = userDetails.getId();
			User u = userRepo.findById(userId).get();
			
			if(phone != null && !phone.isEmpty()) {
				u.setPhone(phone);
			}
			if(country != null && !country.isEmpty()) {
				u.setCountry(country);
			}
			if(country_l != null && !country_l.isEmpty()) {
				u.setCountry_1(country_l);
			}
			if(city != null && !city.isEmpty()) {
				u.setCity(city);
			}
			if(street != null && !street.isEmpty()) {
				u.setStreet(street);
			}
			if(house_number != null && !house_number.isEmpty()) {
				u.setHouseNumber(house_number);
			}
			if(post_other != null && !post_other.isEmpty()) {
				u.setPostOther(post_other);
			}
			userRepo.save(u);
			mr.setMessage("Sikeres módosítás!");
			return mr;
		}
		
		@GetMapping("/getDeliveryAddress")
		public String getDeliveryAddress() {
			String response;
			UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Long userId = userDetails.getId();
			User u = userRepo.findById(userId).get();
			UserDeliveryInfoResponse udi = new UserDeliveryInfoResponse(u);
			ObjectMapper mapper = new ObjectMapper();
			try {
				return mapper.writeValueAsString(udi);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				return "ERROR";
			}
		}
}
