package com.webshop;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webshop.Model.EmailDetails;
import com.webshop.services.EmailService;


/**
 * App controller
 * Bejelentkezés, és jogosultságok nélkül elérhető funkciók
 * @author BalazsPC
 *
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
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
	@Autowired 
	private EmailService emailService;
	
	/**
	 * Elérés / egyéb tesztelési célra
	 * @return String
	 */
	@GetMapping("/testDebug")
	public ResponseEntity<String> getDebug(String to) {
		EmailDetails d = new EmailDetails();
		d.setSubject("Teszt");
		d.setRecipient(to);
		d.setMsgBody("Szia uram, üdvözöl az Incidens Webshop!");
		d.setAttachment("d:/ELTEIK.png");
		String status = emailService.sendMailWithAttachment(d);

		return ResponseEntity.ok().body(status);
	}
		
	/**
	 * Összes tárgy kilistázása
	 * @return String, JSON formátumban ProductResponseModel típusú lista
	 */
	@GetMapping("/productsListing")
	public ResponseEntity<String> productsListing() {
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
			return ResponseEntity.ok().body(mapper.writeValueAsString(list));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(400).body("ERROR");
		}
	}
	
	/**
	 * Összes kategória lekérése
	 * @return String, JSON formátumban ProductCategories lista
	 */
	@GetMapping("categoriesListing") 
	public ResponseEntity<String> categoriesListing() {
		List<ProductCategories> categories = productCategoriesRepo.findAll();
		if(categories.isEmpty())
			return ResponseEntity.badRequest().body("Jelenleg nem található kategória");
		else {
			ObjectMapper mapper = new ObjectMapper();
			try {
				return ResponseEntity.ok().body(mapper.writeValueAsString(categories));
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				return ResponseEntity.status(400).body("ERROR");
			}
		}
	}
	
	/**
	 * Kiekeresi az összes terméket, ami a megadott kategóriába tartozik
	 * @param categoryId int, a kategória azonosítója
	 * @return String, JSON formátumban Product lista
	 */
	@GetMapping("findProductsByCategory")
	public ResponseEntity<String> findProductsByCategory(int categoryId) {
		ObjectMapper mapper = new ObjectMapper();
		
		List<ProductResponseModel> responseList = new ArrayList<ProductResponseModel>();
		
		for(Product p : productRepo.findProductsByCategoryId(categoryId)) {
			ProductResponseModel m = new ProductResponseModel(p);
			m.setImages(productImagesRepo.findAllByProductid(p.getId()));
			m.setVariations(productVariationsRepo.findAllByProductid(p.getId()));
			m.setCategories(productCategoryRepo.findAllByProductid(p.getId()));
			responseList.add(m);
		}
		
		try {
			return ResponseEntity.ok().body(mapper.writeValueAsString(responseList));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(400).body("ERROR");
		}
	}
	
	/**
	 * Termékek lekérése szűrővel - Termék címe, vagy leírása tartalmaz részletet a kulcsszavak valamelyikéből.
	 * Kulcsszavak elváasztása szóközzel (Pl.:  `nagyi torta b` -> Minden tárgyat visszaad, melynek a leírásában, vagy nevében szerepel "nagyi", vagy "torta", vagy "b")
	 * @param filterText String, a felhasználó által a keresőbe beírt szöveg minden formázás nélkül
	 * @return String, JSON formátumban Product lista, melyek megfelelnek a keresésnek
	 */
	@GetMapping("findProductsByFilterText")
	public ResponseEntity<String> findProductsByFilterText(String filterText) {
		if(filterText.isEmpty() || filterText.isBlank()) {
			return productsListing();
		}
		List<Product> findProducts = new ArrayList<Product>();
		String[] filters = filterText.split(" ");
		for(String t : filters) {
			if(t.isEmpty())
				continue;
			for(Product p : productRepo.findProductsByFilterText(t)) {
				if(!findProducts.contains(p)) {
					findProducts.add(p);
				}
			}
		}
		if(findProducts.isEmpty()) {
			return ResponseEntity.status(404).body("Nincs találat!");
		}
		
		List<ProductResponseModel> responseList = new ArrayList<ProductResponseModel>();
		
		for(Product p : findProducts) {
			ProductResponseModel m = new ProductResponseModel(p);
			m.setImages(productImagesRepo.findAllByProductid(p.getId()));
			m.setVariations(productVariationsRepo.findAllByProductid(p.getId()));
			m.setCategories(productCategoryRepo.findAllByProductid(p.getId()));
			responseList.add(m);
		}
		
		ObjectMapper mapper = new ObjectMapper();
		try {
			return ResponseEntity.ok().body(mapper.writeValueAsString(responseList));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(400).body("ERROR");
		}
	}
	
	/**
	 * Speciális keresés kulcsszavakkal - A megadott kulcsszavak bármelyike szerepel egy tárgynál kulcsszóként
	 * Pl.: "nagyi friss" -> Azokat a termékeket adja vissza, melyeknek a kulcsszavai között szerepel a nagyi, VAGY a friss 
	 * @param keywordText
	 * @return String, JSON formátumban Product lista, melyek megfelelnek a keresésnek
	 */
	@GetMapping("findProductsByKeywordAny")
	public ResponseEntity<String> findProductsByKeywordAny(String keywordText) {
		if(keywordText == null || keywordText.isEmpty() || keywordText.isBlank()) {
			return productsListing();
		}
		List<Product> findProducts = new ArrayList<Product>();
		String[] filters = keywordText.split(" ");
		for(String t : filters) {
			if(t.isEmpty())
				continue;
			for(Product p : productRepo.findProductsByKeyword(t)) {
				if(!findProducts.contains(p)) {
					findProducts.add(p);
				}
			}
		}
		if(findProducts.isEmpty()) {
			return ResponseEntity.status(404).body("Nincs találat!");
		}
		
		List<ProductResponseModel> responseList = new ArrayList<ProductResponseModel>();
		
		for(Product p : findProducts) {
			ProductResponseModel m = new ProductResponseModel(p);
			m.setImages(productImagesRepo.findAllByProductid(p.getId()));
			m.setVariations(productVariationsRepo.findAllByProductid(p.getId()));
			m.setCategories(productCategoryRepo.findAllByProductid(p.getId()));
			responseList.add(m);
		}
		
		ObjectMapper mapper = new ObjectMapper();
		try {
			return ResponseEntity.ok().body(mapper.writeValueAsString(responseList));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(400).body("ERROR");
		}
	}
	
	/**
	 * Speciális keresés kulcsszavakkal - A megadott kulcsszavak mindegyike szerepel egy tárgynál kulcsszóként
	 * Pl.: "nagyi friss" -> Azokat a termékeket adja vissza, melyeknek a kulcsszavai között szerepel a nagyi, ÉS a friss IS
	 * @param keywordText
	 * @return String, JSON formátumban Product lista, melyek megfelelnek a keresésnek
	 */
	@GetMapping("findProductsByKeywordAll")
	public ResponseEntity<String> findProductsByKeywordAll(String keywordText) {
		if(keywordText.isEmpty() || keywordText.isBlank()) {
			return productsListing();
		}
		
		String[] filters = keywordText.split(" ");
		List<Product> findProducts = productRepo.findProductsByKeyword(filters[0]);
		for(String keyword : filters) {
			for(int i = findProducts.size()-1; i >= 0; i--) {
				if(keywordsRepo.hasKeyword(findProducts.get(i).getId(), keyword) == 0) {
					findProducts.remove(i);
					continue;
				}
			}
		}
		
		if(findProducts.isEmpty()) {
			return ResponseEntity.status(404).body("Nincs találat!");
		}
		
		List<ProductResponseModel> responseList = new ArrayList<ProductResponseModel>();
		
		for(Product p : findProducts) {
			ProductResponseModel m = new ProductResponseModel(p);
			m.setImages(productImagesRepo.findAllByProductid(p.getId()));
			m.setVariations(productVariationsRepo.findAllByProductid(p.getId()));
			m.setCategories(productCategoryRepo.findAllByProductid(p.getId()));
			responseList.add(m);
		}
		
		ObjectMapper mapper = new ObjectMapper();
		try {
			return ResponseEntity.ok().body(mapper.writeValueAsString(responseList));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(400).body("ERROR");
		}
	}
}