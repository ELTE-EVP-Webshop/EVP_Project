package com.webshop;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webshop.Model.orderStates;
import com.webshop.requestmodels.ProductReqRep;
import com.webshop.requestmodels.imageReqRepModel;
import com.webshop.requestmodels.variationReqRepModel;
import com.webshop.responsemodels.MessageResponse;

/**
 * 
 * @author BalazsPC
 * Admin controller: Csak bejelentkezés után ROLE_ADMIN1, ROLE_ADMIN2 jogosultsággal érhető el
 * Összes repo elérhető belőle
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
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
	
	/**
	 * Elérés / jogosultság / egyéb tesztelésére
	 * @return String
	 */
	@GetMapping("/testDebug")
	public String getDebug() {
		return "Szia :)";
	}

	/**
	 * Új termék rögzítése
	 * @param newProduct RequestBody-ból ProductReqRep adattípus
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("insertNewProduct")
	public ResponseEntity<MessageResponse> insertNewProduct(@RequestBody ProductReqRep newProduct){
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
		return ResponseEntity.ok().body(mr);
	}
	
	@PostMapping("updateProduct")
	public ResponseEntity<?> updateProduct(long productId, @RequestBody ProductReqRep updateProduct) {
		Optional<Product> op = productRepo.findById(productId);
		if(op.isEmpty()) {
			return ResponseEntity.status(404).body("Product not found");
		}
		Product p = op.get();
		if(updateProduct.getName() == null)
			return ResponseEntity.badRequest().body("A termék nevét kötelező megadni!");
		if(updateProduct.getPrice() < 1 || updateProduct.getSalePrice() < 1)
			return ResponseEntity.badRequest().body("A termék ára, és kedvezményes ára nem lehet 1-nél kisebb!");
		if(updateProduct.getStock() < 0)
			return ResponseEntity.badRequest().body("A raktárkészlet nem lehet kisebb, mint 0!");
			
		p.setName(updateProduct.getName());
		p.setDescription(updateProduct.getDescription());
		p.setPrice(updateProduct.getPrice());
		p.setSale_price(updateProduct.getSalePrice());
		p.setStock(updateProduct.getStock());
		p.setVisible(updateProduct.isVisible());
		productRepo.save(p);
		
		//Images
		productImagesRepo.deleteProductImagesByProductId(p.getId());
		if(updateProduct.getImages() != null && updateProduct.getImages().size() > 0) {
			for(imageReqRepModel i : updateProduct.getImages()) {
				ProductImages pimg = new ProductImages();
				pimg.setImage_url(i.getUrl());
				pimg.setPriority(i.getPriority());
				pimg.setProductid(p.getId());
				productImagesRepo.save(pimg);
			}
		}
		
		//Category
		productCategoryRepo.deleteAllProductCategoryById(p.getId());
		if(updateProduct.getCategories() != null &&updateProduct.getCategories().size() > 0) {
			for(int i : updateProduct.getCategories()) {
				ProductCategory pc = new ProductCategory();
				pc.setProductid(p.getId());
				pc.setCategory_id(i);
				productCategoryRepo.save(pc);
			}
		}
		
		//Keywords
		keywordsRepo.deleteAllKeywordByProductId(p.getId());
		if(updateProduct.getKeywords() != null && updateProduct.getKeywords().size() > 0) {
			for(String s : updateProduct.getKeywords()) {
				Keywords k = new Keywords();
				k.setKeyword(s);
				k.setProduct_id(p.getId());
				keywordsRepo.save(k);
			}
		}
		
		//Variations
		
		if(updateProduct.getVariations() != null && updateProduct.getVariations().size() > 0) {
			for(variationReqRepModel v : updateProduct.getVariations()) {
				ProductVariations pv = new ProductVariations();
				pv.setSmall_desc(v.getDescription());
				pv.setProductid(p.getId());
				pv.setVariation_id(v.getVariation());
				productVariationsRepo.save(pv);
			}
		}
		
		return ResponseEntity.ok().body("Sikeres rögzítés!");
	}
	
	
	/**
	 * Új termékkategória létrehozása
	 * @param category Kategória neve
	 * @param smallDesc Kategória rövid leírása
	 * @param piority Prioritás (megjelenés sorrendje)
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("createCategory")
	public ResponseEntity<MessageResponse> createCategory(String category, String smallDesc, byte piority) {
		MessageResponse mr = new MessageResponse();
		ProductCategories pc = new ProductCategories();
		pc.setCategory(category);
		pc.setDescription(smallDesc);
		pc.setPriority(piority);
		long pcid = productCategoriesRepo.save(pc).getId();
		mr.setMessage("Sikeres rögzítés: "+pcid);
		return ResponseEntity.ok().body(mr);
	}
	
	/**
	 * "Termékcsoport" létrehozása
	 * @param variation Csoport neve
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("createVariation")
	public ResponseEntity<MessageResponse> createVariation(String variation) {
		MessageResponse mr = new MessageResponse();
		Variations v = new Variations();
		v.setName(variation);
		Long vid = variationsRepo.save(v).getId();
		mr.setMessage("Sikeres rögzítés: "+vid);
		return ResponseEntity.ok().body(mr);
	}
	
	/**
	 * Termékkategóriák lekérdezése
	 * @return String, JSON formátumban az összes termékkategória, ezek típusa ProductCategories
	 */
	@GetMapping("getCategories")
	public ResponseEntity<String> getCategories() {
		List<ProductCategories> categoris = productCategoriesRepo.findAll();
		if(categoris.size() > 0) {
			ObjectMapper mapper = new ObjectMapper();
			try {
				return ResponseEntity.ok().body(mapper.writeValueAsString(categoris));
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				return ResponseEntity.status(400).body("ERROR");
			}
		}else {
			return ResponseEntity.status(400).body("Empty");
		}
	}
	
	/**
	 * Összes termékcsoport lekérése
	 * @return String, JSON formátumban az összes "termékcsoport", ezek típusát a Variations osztály írja le
	 */
	@GetMapping("getVariations")
	public ResponseEntity<String> getVariations() {
		List<Variations> variations = variationsRepo.findAll();
		if(variations.size() > 0) {
			ObjectMapper mapper = new ObjectMapper();
			try {
				return ResponseEntity.ok().body(mapper.writeValueAsString(variations));
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				return ResponseEntity.status(400).body("ERROR");
			}
		}else {
			return ResponseEntity.status(400).body("Empty");
		}
	}
	
	/**
	 * Termékkategória módosítása
	 * Keresés az elsődleges kulcs alapján, ami nem módosítható. Az összes többi adat igen.
	 * @param id long, a kategória (elsődleges) azonosítója, ez alapján azonosítjuk melyik kategóriát kell módosítani, nem módosítható
	 * @param category String, a kategória (új)neve
	 * @param smallDesc String, a kategória (új)rövid leírása
	 * @param priority byte, a kategória (új)prioritása
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("updateCategory")
	public ResponseEntity<MessageResponse> updateCategory(long id, String category, String smallDesc, byte priority) {
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
		
		return ResponseEntity.ok().body(mr);
	}
	
	/**
	 * "Termékcsoportok" módosítása
	 * Csak a termékcsoport neve módosítható. Keresés elsődleges kulcs(id) alapján
	 * @param id long, A termékcsoport egyedi azonosítója, nem módosítható
	 * @param variation String, a termékcsoport új neve
	 * @return
	 */
	@PostMapping("updateVariation")
	public ResponseEntity<MessageResponse> updateVariation(long id, String variation) {
		MessageResponse mr = new MessageResponse();
		
		Optional<Variations> v = variationsRepo.findById(id);
		if(!v.isEmpty()) {
			v.get().setName(variation);
			variationsRepo.save(v.get());
			mr.setMessage("Minden módosítás elmentve!");
		}else {
			mr.setMessage("notFound");
		}
		
		return ResponseEntity.ok().body(mr);
	}
	
	/**
	 * Termék felvétele egy termékkategóriába
	 * Csak létező terméket lehet rögzíteni, létező kategóriába
	 * @param prodId long, A kategóriába felvenni kívánt termék egyedi azonosítója
	 * @param catId long, A kategória azonosítója, ahova fel szeretnénk venni a terméket
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("addProductToCategory")
	public ResponseEntity<MessageResponse> addProductToCategory(long prodId, long catId) {
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
		
		return ResponseEntity.ok().body(mr);
	}
	
	/**
	 * Termék törlése egy kategóriából
	 * Kapcsoló táblát módosítunk, törlés nem okoz integritási problémákat.
	 * @param prodId long, a tárgy egyedi azonosítója
	 * @param catId long, a kategória egyedi azonosítója
	 * @return MessageResponse, eredmény
	 */
	@DeleteMapping("removeProductFromCategory")
	public ResponseEntity<MessageResponse> removeProductFromCategory(long prodId, long catId) {
		MessageResponse mr = new MessageResponse();
		ProductCategoryId pcid = new ProductCategoryId(catId, prodId);
		Optional<ProductCategory> pc = productCategoryRepo.findById(pcid);
		
		if(!pc.isEmpty()) {
			productCategoryRepo.delete(pc.get());
			mr.setMessage("Sikeres törlés!");
		} else {
			mr.setMessage("notFound");
		}
		
		return ResponseEntity.ok().body(mr);
	}
	
	/**
	 * Tárgy felvétele termékcsoportba
	 * 
	 * @param prodId long, a termék egyedi azonosítója
	 * @param varId long, a termékkategória egyedi azonosítója
	 * @param desc String, a termék rövid leírása a csoporton belül (pl [Piros / Kék / Zöld] [0.5L / 1L / 1.75L])
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("addProductToVariation")
	public ResponseEntity<MessageResponse> addProductToVariation(long prodId, long varId, String desc) {
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
		
		return ResponseEntity.ok().body(mr);
	}
	
	/**
	 * Termék törlése termékcsoportból
	 * Kapcsoló táblából törülnk, nem okoz adatintegritási problémát
	 * @param prodId long, a termék egyedi azonosítója
	 * @param varId long, a termékcsoport egyedi azonosítója
	 * @return MessageResponse, eredmény
	 */
	@DeleteMapping("removeProductFromVariation")
	public ResponseEntity<MessageResponse> removeProductFromVariation(long prodId, long varId) {
		MessageResponse mr = new MessageResponse();
		ProductVariationsId pvid = new ProductVariationsId(varId, prodId);
		Optional<ProductVariations> pv = productVariationsRepo.findById(pvid);
		
		if(!pv.isEmpty()) {
			productVariationsRepo.delete(pv.get());
			mr.setMessage("Sikeres törlés!");
		} else {
			mr.setMessage("notFound");
		}
		
		return ResponseEntity.ok().body(mr);
	}
	
	/**
	 * Minden rendelés lekérdezése - Adminisztrátor
	 * @return
	 */
	@GetMapping("getAllOrder")
	public ResponseEntity<?> getOrders() {
		List<Orders> orders = ordersRepo.findAll();
		if(orders.isEmpty()) {
			return ResponseEntity.ok().body(new MessageResponse("Nem található korábbi rendelés!"));
		}
		else {
			try {
				ObjectMapper mapper = new ObjectMapper();
				return ResponseEntity.ok().body(new MessageResponse(mapper.writeValueAsString(orders)));
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
			}
			
		}
		
		
	}
	
	/**
	 * Rendelés keresése azonosító alapján - Admin
	 * @param ordeId
	 * @return
	 */
	@GetMapping("findOrderById")
	public ResponseEntity<?> findOrderById(long ordeId) {
		Optional<Orders> order = ordersRepo.findById(ordeId);
		if(order.isEmpty()) {
			return ResponseEntity.ok().body(new MessageResponse("Nem található rendelés ezzel az azonosítóval!"));
		}
		else {
			try {
				ObjectMapper mapper = new ObjectMapper();
				return ResponseEntity.ok().body(new MessageResponse(mapper.writeValueAsString(order)));
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
			}
			
		}
		
		
	}
	
	/**
	 * Rendeléshez tartozó termékek lekérése - Admin
	 * @param orderId A keresett rendelés azonosítója
	 * @return MessageResponse String adattaggal, a rendeléshez tartozó termékek JSON formátumban, vagy hibaüzenet
	 */
	@GetMapping("getOrderProducts")
	public ResponseEntity<?> getOrderProducts(long orderId) {
		if(ordersRepo.findById(orderId).isEmpty()) {
			return ResponseEntity.status(404).body(new MessageResponse("Nem található rendelés ezzel az azonosítóval!"));
		}
		
		List<OrderProducts> op = orderProductsRepo.findAllByOrderid(orderId);
		
		try {
		ObjectMapper mapper = new ObjectMapper();
		return ResponseEntity.ok(new MessageResponse(mapper.writeValueAsString(op)));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
		}
	}
	
	/**
	 * Rendelés státuszának módosítása
	 * @param orderId long, rendelés azonosítója
	 * @param newState byte, új státusz
	 * @return MessageResponse, tartalma a módosítás eredmény (Siker / Ha sikertelen, miért)
	 */
	@PostMapping("updateOrderState")
	public ResponseEntity<?> updateOrderState(long orderId, byte newState) {
		if(ordersRepo.findById(orderId).isEmpty()) {
			return ResponseEntity.status(400).body(new MessageResponse("Rendelés nem található!"));
		}
		if(!orderStates.isValidOrderState(newState)) {
			return ResponseEntity.status(400).body(new MessageResponse("Hibás státuszkód!"));
		}
		Orders o = ordersRepo.findById(orderId).get();
		o.setOrder_state(newState);
		ordersRepo.save(o);
		return ResponseEntity.ok().body(new MessageResponse("Sikeres módosítás!"));
	}
	
}