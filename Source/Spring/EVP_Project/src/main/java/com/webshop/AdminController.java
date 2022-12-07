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
import com.webshop.requestmodels.ProductReqRep;
import com.webshop.requestmodels.SignupRequest;
import com.webshop.requestmodels.imageReqRepModel;
import com.webshop.requestmodels.variationReqRepModel;
import com.webshop.responsemodels.MessageResponse;
import com.webshop.responsemodels.UserDeliveryInfoResponse;

import ch.qos.logback.core.net.ObjectWriter;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
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
		
		@PostMapping("insertNewProduct")
		public MessageResponse insertNewProduct(@RequestBody ProductReqRep newProduct){
			MessageResponse mr = new MessageResponse();
			//Product
			Product p = new Product();
			p.setName(newProduct.getName());
			p.setDescription(newProduct.getDescription());
			p.setPrice(newProduct.getPrice());
			p.setSale_price(newProduct.getSalePrice());
			p.setStock(newProduct.getStock());
			p.setVisible(newProduct.isVisible());
			Product saved = productRepo.save(p);
			//Images
			if(newProduct.getImages() != null && newProduct.getImages().size() > 0) {
				for(imageReqRepModel i : newProduct.getImages()) {
					ProductImages pimg = new ProductImages();
					pimg.setImage_url(i.getUrl());
					pimg.setPriority(i.getPriority());
					pimg.setProductid(saved.getId());
					productImagesRepo.save(pimg);
				}
			}
			//Category
			if(newProduct.getCategories() != null && newProduct.getCategories().size() > 0) {
				for(int i : newProduct.getCategories()) {
					ProductCategory pc = new ProductCategory();
					pc.setProductid(saved.getId());
					pc.setCategory_id(i);
					productCategoryRepo.save(pc);
				}
			}
			//Keywords
			if(newProduct.getKeywords() != null && newProduct.getKeywords().size() > 0) {
				for(String s : newProduct.getKeywords()) {
					Keywords k = new Keywords();
					k.setKeyword(s);
					k.setProduct_id(saved.getId());
					keywordsRepo.save(k);
				}
			}
			//Variations
			if(newProduct.getVariations() != null && newProduct.getVariations().size() > 0) {
				for(variationReqRepModel v : newProduct.getVariations()) {
					ProductVariations pv = new ProductVariations();
					pv.setSmall_desc(v.getDescription());
					pv.setProductid(saved.getId());
					pv.setVariation_id(v.getVariation());
					productVariationsRepo.save(pv);
				}
			}
			mr.setMessage("Sikeres rögzítés!");
			return mr;
		}
		
		@PostMapping("createCategory")
		public MessageResponse createCategory(String category, String smallDesc, byte piority) {
			MessageResponse mr = new MessageResponse();
			ProductCategories pc = new ProductCategories();
			pc.setCategory(category);
			pc.setDescription(smallDesc);
			pc.setPriority(piority);
			long pcid = productCategoriesRepo.save(pc).getId();
			mr.setMessage("Sikeres rögzítés: "+pcid);
			return mr;
		}
		
		@PostMapping("createVariation")
		public MessageResponse createVariation(String variation) {
			MessageResponse mr = new MessageResponse();
			Variations v = new Variations();
			v.setName(variation);
			Long vid = variationsRepo.save(v).getId();
			mr.setMessage("Sikeres rögzítés: "+vid);
			return mr;
		}
		
		@GetMapping("getCategories")
		public String getCategories() {
			List<ProductCategories> categoris = productCategoriesRepo.findAll();
			if(categoris.size() > 0) {
				ObjectMapper mapper = new ObjectMapper();
				try {
					return mapper.writeValueAsString(categoris);
				} catch (JsonProcessingException e) {
					e.printStackTrace();
					return "ERROR";
				}
			}else {
				return "Empty";
			}
		}
		
		@GetMapping("getVariations")
		public String getVariations() {
			List<Variations> variations = variationsRepo.findAll();
			if(variations.size() > 0) {
				ObjectMapper mapper = new ObjectMapper();
				try {
					return mapper.writeValueAsString(variations);
				} catch (JsonProcessingException e) {
					e.printStackTrace();
					return "ERROR";
				}
			}else {
				return "Empty";
			}
		}
		
		@PostMapping("updateCategory")
		public MessageResponse updateCategory(long id, String category, String smallDesc, byte priority) {
			MessageResponse mr = new MessageResponse();
			
			Optional<ProductCategories> pc = productCategoriesRepo.findById(id);
			if(!pc.isEmpty()) {
				pc.get().setCategory(category);
				pc.get().setDescription(smallDesc);
				pc.get().setPriority(priority);
				productCategoriesRepo.save(pc.get());
				mr.setMessage("Minden módosítás elmentve!");
			}else {
				mr.setMessage("notFound");
			}
			
			return mr;
		}
		
		@PostMapping("updateVariation")
		public MessageResponse updateVariation(long id, String variation) {
			MessageResponse mr = new MessageResponse();
			
			Optional<Variations> v = variationsRepo.findById(id);
			if(!v.isEmpty()) {
				v.get().setName(variation);
				variationsRepo.save(v.get());
				mr.setMessage("Minden módosítás elmentve!");
			}else {
				mr.setMessage("notFound");
			}
			
			return mr;
		}
		
		@PostMapping("addProductToCategory")
		public MessageResponse addProductToCategory(long prodId, long catId) {
			MessageResponse mr = new MessageResponse();
			
			Optional<Product> p = productRepo.findById(prodId);
			Optional<ProductCategories> c = productCategoriesRepo.findById(catId);
			if(p.isEmpty()) {
				mr.setMessage("Termék nem található!");
			}else {
				if(c.isEmpty()) {
					mr.setMessage("Kategória nem található!");
				}else {
					ProductCategory pc = new ProductCategory();
					pc.setCategory_id(catId);
					pc.setProductid(prodId);
					productCategoryRepo.save(pc);
					mr.setMessage("Sikeres rögzítés!");
				}
			}
			
			return mr;
		}
		
		@DeleteMapping("removeProductFromCategory")
		public MessageResponse removeProductFromCategory(long prodId, long catId) {
			MessageResponse mr = new MessageResponse();
			ProductCategoryId pcid = new ProductCategoryId(catId, prodId);
			Optional<ProductCategory> pc = productCategoryRepo.findById(pcid);
			
			if(!pc.isEmpty()) {
				productCategoryRepo.delete(pc.get());
				mr.setMessage("Sikeres törlés!");
			} else {
				mr.setMessage("notFound");
			}
			
			return mr;
		}
		
		@PostMapping("addProductToVariation")
		public MessageResponse addProductToVariation(long prodId, long varId, String desc) {
			MessageResponse mr = new MessageResponse();
			Optional<Product> p = productRepo.findById(prodId);
			Optional<Variations> v = variationsRepo.findById(varId);
			if(p.isEmpty()) {
				mr.setMessage("Termék nem található!");
			}else {
				if(v.isEmpty()) {
					mr.setMessage("Variáció nem található!");
				}else {
					ProductVariations pv = new ProductVariations();
					pv.setVariation_id(varId);
					pv.setProductid(prodId);
					pv.setSmall_desc(desc);
					productVariationsRepo.save(pv);
					mr.setMessage("Sikeres rögzítés!");
				}
			}
			
			return mr;
		}
		
		@DeleteMapping("removeProductFromVariation")
		public MessageResponse removeProductFromVariation(long prodId, long varId) {
			MessageResponse mr = new MessageResponse();
			ProductVariationsId pvid = new ProductVariationsId(varId, prodId);
			Optional<ProductVariations> pv = productVariationsRepo.findById(pvid);
			
			if(!pv.isEmpty()) {
				productVariationsRepo.delete(pv.get());
				mr.setMessage("Sikeres törlés!");
			} else {
				mr.setMessage("notFound");
			}
			
			return mr;
		}
	}
