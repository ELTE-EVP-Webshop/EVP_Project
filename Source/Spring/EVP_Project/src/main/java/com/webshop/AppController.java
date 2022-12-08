package com.webshop;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ch.qos.logback.core.net.ObjectWriter;

/**
 * App controller
 * Bejelentkezés, és jogosultságok nélkül elérhető funkciók
 * @author BalazsPC
 *
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/app")
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
	
	/**
	 * Elérés / egyéb tesztelési célra
	 * @return String
	 */
	@GetMapping("/testDebug")
	public String getDebug() {
		return "Szia :)";
	}
		
	/**
	 * Összes tárgy kilistázása
	 * @return String, JSON formátumban ProductResponseModel típusú lista
	 */
	@GetMapping("/productsListing")
	public String productsListing() {
		List<ProductResponseModel> list = new ArrayList<>();
		for(Product p : productRepo.findAll()) {
			ProductResponseModel m = new ProductResponseModel(p);
			m.setImages(productImagesRepo.findAllByProductid(p.getId()));
			m.setVariations(productVariationsRepo.findAllByProductid(p.getId()));
			m.setCategories(productCategoryRepo.findAllByProductid(p.getId()));
			list.add(m);
		}
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(list);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return "ERROR";
		}
	}
		
}
