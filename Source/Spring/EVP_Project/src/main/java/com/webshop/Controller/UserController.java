package com.webshop.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.webshop.Model.EmailDetails;
import com.webshop.Model.UserDetailsImpl;
import com.webshop.Model.deliveryMethods;
import com.webshop.Model.paymentMethods;
import com.webshop.dbModels.Basket;
import com.webshop.idModels.BasketId;
import com.webshop.repos.BasketRepository;
//import com.webshop.repos.KeywordsRepository;
import com.webshop.repos.OrderProductsRepository;
import com.webshop.repos.OrdersRepository;
//import com.webshop.repos.ProductCategoriesRepository;
//import com.webshop.repos.ProductCategoryRepository;
//import com.webshop.repos.ProductImagesRepository;
import com.webshop.repos.ProductRepository;
//import com.webshop.repos.ProductVariationsRepository;
//import com.webshop.repos.TokensRepository;
import com.webshop.repos.UserRepository;
//import com.webshop.repos.VariationsRepository;
import com.webshop.responsemodels.MessageResponse;
import com.webshop.responsemodels.UserDeliveryInfoResponse;
import com.webshop.services.EmailService;
import com.webshop.services.JwtUtils;
import com.webshop.services.ServiceConfiguration;
import com.webshop.services.pdfService;
import com.webshop.dbModels.*;

/**
 * User controller, csak bejelentkezés után érhető el, user jogosultsággal
 * @author BalazsPC
 *
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
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
	//@Autowired
	//private ProductVariationsRepository productVariationsRepo;
	//@Autowired
	//private ProductImagesRepository productImagesRepo;
	//@Autowired
	//private ProductCategoryRepository productCategoryRepo;
	//@Autowired
	//private KeywordsRepository keywordsRepo;
	//@Autowired
	//private TokensRepository tokensRepo;
	//@Autowired
	//private ProductCategoriesRepository productCategoriesRepo;
	//@Autowired
	//private VariationsRepository variationsRepo;
	@Autowired
	PasswordEncoder encoder;
	@Autowired
	pdfService pdfCreator;
	@Autowired 
	private EmailService emailService;
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	JwtUtils jwtUtils;
	@Autowired
	ServiceConfiguration config;
	
	/**
	 * Teszt metódus, jogosultságok / elérés / egyéb tesztre
	 * @return
	 */
	@GetMapping("/testDebug")
	public String getDebug() {
		return "Szia :)";
	}
	
	/**
	 * Termék kosárba rakása
	 * @param productId long, Termék egyedi azonosítója
	 * @param count int, Kosárba rakni kívánt termék mennyisége
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("/addItemToBasket")
	public ResponseEntity<MessageResponse> addItemToBasket(long productId,  int count) {
		MessageResponse response = new MessageResponse();
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = userDetails.getId();
		if(count < 1) {
			response.setMessage("A rendelt mennyiség nem lehet kisebb 1-nél!");
			return ResponseEntity.ok().body(response);
		}
		if(!basketRepo.findById(new BasketId(userId, productId)).isEmpty()){
			response.setMessage("A termék már szerepel a kosárban!");
			return ResponseEntity.ok().body(response);
		}
		if(productRepo.findById(productId).isEmpty()) {
			response.setMessage("Ilyen termék nem létezik!");
			return ResponseEntity.ok().body(response);
		}
		if(productRepo.findById(productId).get().getStock() < count) {
			response.setMessage("A termékből jelenleg csak " + productRepo.findById(productId).get().getStock() + " darab érhető el!");
			return ResponseEntity.ok().body(response);
		}
		try {
			Basket b = new Basket(userId, productId, count);
			if(basketRepo.save(b) != null) { response.setMessage("Tárgy sikeresen felvéve a korsárba!"); }
			else { response.setMessage("A tárgyat nem sikerült a kosárhoz adni!"); }
		} catch(Exception e){
			System.out.println(e.getMessage());
		}
		return ResponseEntity.ok().body(response);
	}
	
	/**
	 * Tárgy eltávolítása a kosárból
	 * Kapcsolótábla, a törlés nem okoz adatintegritási problémákat
	 * @param productId long, Termék egyedi azonosítója
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("/removeItemFromBasket")
	public ResponseEntity<MessageResponse> removeItemFromBasket(long productId) {
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
		return ResponseEntity.ok().body(response);
	}
	
	/**
	 * Kosárban lévő termék mennyiségének módosítása
	 * @param productId long, termék egyedi azonosítója
	 * @param newCount int, az új mennyiség
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("/updateProductCountInBasket")
	public ResponseEntity<MessageResponse> removeItemFromBasket(long productId, int newCount) {
		MessageResponse response = new MessageResponse();
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = userDetails.getId();
		if(newCount < 1) {
			response.setMessage("A rendelt mennyiség nem lehet kisebb 1-nél!");
			return ResponseEntity.ok().body(response);
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
		return ResponseEntity.ok().body(response);
	}
		
	/**
	 * Kosárban lévő termékek lekérése
	 * @return String, JSON formátum Basket típusú lista
	 */
	@GetMapping("/getBasketProducts")
	public ResponseEntity<String> getBasketProducts() {
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = userDetails.getId();
		
		List<Basket> userBasket = basketRepo.findAllByUserid(userId);
		if(userBasket.size() > 0) {
			ObjectMapper mapper = new ObjectMapper();
			try {
				return ResponseEntity.ok().body(mapper.writeValueAsString(userBasket));
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				return ResponseEntity.status(400).body("ERROR");
			}
		}else {
			return ResponseEntity.ok().body("Empty");
		}
	}
		
	/**
	 * Szállítási adatok módosítása
	 * Felhasználóhoz mentett szállítási adatok módosítása. Felhasználó beazonosítása a token alapján, nem kell id-t küldeni.
	 * @param phone String, telefonszám
	 * @param country String, ország
	 * @param country_l String, Megye
	 * @param city String, Város
	 * @param post_code short, irányítószám
	 * @param street String, utca
	 * @param house_number String, házszám kiegészítőkkel (Pl.: 1/A)
	 * @param post_other String, egyéb információ, megjegyzés
	 * @return MessageResponse, eredmény
	 */
	@PostMapping("/updateDeliveryAddress")
	public ResponseEntity<MessageResponse> updateDeliveryAddress(String phone, String country, String country_l, String city, short post_code, String street, String house_number, String post_other) {
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
		return ResponseEntity.ok().body(mr);
	}
		
	/**
	 * Szállítási adatok lekérése
	 * Bejelentkezett fálhasználóhoz tartozó szállítási adatok lekérése. Paramétert nem vár, id a token alapján kerül meghatározásra.
	 * @return String, JSON formátumban visszaküldve UserDeliveryInfoResponse adattípus
	 */
	@GetMapping("/getDeliveryAddress")
	public ResponseEntity<String> getDeliveryAddress() {
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = userDetails.getId();
		User u = userRepo.findById(userId).get();
		UserDeliveryInfoResponse udi = new UserDeliveryInfoResponse(u);
		ObjectMapper mapper = new ObjectMapper();
		try {
			return ResponseEntity.ok().body(mapper.writeValueAsString(udi));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(400).body("ERROR");
		}
	}
	
	/**
	 * Rendelés leadása
	 * Kosárban lévő termékek megrendelése, rednelés létrehozása (ha van mindenből elég termék)
	 * Adatok ellenőrzése, készlet ellenőrzése, Rendelés létrehozása, termékek áthelyezése a rendeléshez (készlet csökkentése)
	 * Amennyiben a rendelés teljesíthető, PDF számla létrehozása, sikeres létrehozás esetén annak kiküldése a regisztrált E-mail címre
	 * @param phone String, telefonszám
	 * @param country Sring, ország
	 * @param country_l String, megye
	 * @param city String, város
	 * @param post_code short, irányítószám
	 * @param street String, utca
	 * @param house_number String, házszám (teljes, pl.: 1/A)
	 * @param post_other String, egyéb pl emelet, ajtó
	 * @param paymentMethod short, fizetés módja (jelenleg 1-2-3)
	 * @return MessageResponse, String adattípussal, rendelés eredménye (Sikeres / ha hiba miért) 
	 */
	@PostMapping("completeOrder")
	public ResponseEntity<?> completeOrder(String phone, String country, String country_l, String city, short post_code, String street, String house_number, String post_other, short paymentMethod, short deliveryMethod){
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = userDetails.getId();
		
		User u = userRepo.findById(userId).get();
		if(!u.isMailConfirmed()) {
			return ResponseEntity.ok().body(new MessageResponse("Rendelés sikertelen: Kérjük erősítse meg az E-mail címét a regisztrációkor kapott levélben!"));
		}
		
		List<Basket> products = basketRepo.findAllByUserid(userId);
		
		if(products.size() < 1) {
			return ResponseEntity.ok().body(new MessageResponse("A kosár üres!"));
		}
		if(phone == null || phone.isEmpty() || phone.isBlank()) {
			return ResponseEntity.ok().body(new MessageResponse("A telefonszám mező nem lehet üres!"));
		}
		if(country == null || country.isEmpty() || country.isBlank()) {
			return ResponseEntity.ok().body(new MessageResponse("Az ország mező nem lehet üres!"));
		}
		if(country_l == null || country_l.isEmpty() || country_l.isBlank()) {
			return ResponseEntity.ok().body(new MessageResponse("A megye mező nem lehet üres!"));
		}
		if(city == null || city.isEmpty() || city.isBlank()) {
			return ResponseEntity.ok().body(new MessageResponse("A város mező nem lehet üres!"));
		}
		if(street == null || street.isEmpty() || street.isBlank()) {
			return ResponseEntity.ok().body(new MessageResponse("A város mező nem lehet üres!"));
		}
		if(house_number == null || house_number.isEmpty() || house_number.isBlank()) {
			return ResponseEntity.ok().body(new MessageResponse("A házszám mező nem lehet üres!"));
		}
		if(!paymentMethods.isValidPaymentMethod(paymentMethod)) {
			return ResponseEntity.ok().body(new MessageResponse("Hibás fizetési mód!"));
		}
		if(!deliveryMethods.isValidDeliveryMethod(deliveryMethod)){
			return ResponseEntity.ok().body(new MessageResponse("Hibás szállítási mód!"));
		}
		
		for(Basket b : products) {
			if(productRepo.findById(b.getProduct_id()).get().getStock() < b.getCount()) {
				return ResponseEntity.ok().body(new MessageResponse(productRepo.findById(b.getProduct_id()).get().getName() + " nevű termékből csak " + productRepo.findById(b.getProduct_id()).get().getStock() + " db van raktáron."));
			}
		}
		
		Orders o = new Orders();
		o.setPhone(phone);
		o.setCountry(country);
		o.setCountry_1(country_l);
		o.setCity(city);
		o.setPost_code(post_code);
		o.setStreet(street);
		o.setHouse_number(house_number);
		o.setPost_other(post_other);
		o.setPayment_method(paymentMethod);
		o.setUser_id(userId);
		o.setOrder_date(LocalDateTime.now());
		o.setOrder_state((byte)0);
		o.setPayment_state((byte)0);
		o.setDelivery_method(deliveryMethod);
		
		Orders actualOrder = ordersRepo.save(o);

		for(Basket b : products) {
			Product p = productRepo.findById(b.getProduct_id()).get();
			p.setStock(p.getStock() - b.getCount());
			productRepo.save(p);
			OrderProducts op = new OrderProducts();
			op.setCount(b.getCount());
			op.setOrder_id(actualOrder.getId());
			op.setProduct_id(b.getProduct_id());
			op.setPrice(p.getPrice());
			op.setSale_price(op.getSale_price());
			orderProductsRepo.save(op);
		}
		
		if(pdfCreator.createReceiptPdf(actualOrder.getId(), products, userDetails.getUsername(), paymentMethod)) {
			EmailDetails d = new EmailDetails();
			d.setSubject("IK Webshop - Számla");
			d.setRecipient(userDetails.getEmail());
			d.setAttachment("receipts/rendeles_"+actualOrder.getId()+"_szamla.pdf");
			d.setMsgBody("<p>Tisztelt <b>"+userDetails.getUsername()+"!</b></p><p>Ezúton küldjük a(z) "+actualOrder.getId()+" számon leadott rendeléséhez tartozó számlát.</p>"
					+ "<p><labael style='color:green'>Köszönjük</label> a rendelését! Amennyiben kérdése merült fel, kérjük keressen minket az alábbi elérhetőségeink egyikén: </p>"
					+ "<ul><li>+36 00 1234567</li><li>evpwebshop@gmail.com</li></ul><br><p>Szép napot kíván: <b>IK Webshop Team</b></p>");
			emailService.sendMailInHtmlFormatWithAttachment(d);
		}
		
		basketRepo.clearBasketById(userId);
		
		return ResponseEntity.ok().body(new MessageResponse("Rendelés sikeresen rögzítve az alábbi azonosítóval: "+actualOrder.getId()));
	}
	
	/**
	 * Felhasználó rendelés előzményeinek lekérése
	 * Minden felhasználó csak a saját rendeléseit éri el
	 * @return MessageResponse, tartalma siker esetén a rendelések JSON formátumban ({@literal List<Orders> }), ha nem volt még rendelés, akkor üzenet, hiba esetén hiba leírás
	 */
	@GetMapping("getOrders")
	public ResponseEntity<?> getOrders() {
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = userDetails.getId();
		List<Orders> orders = ordersRepo.findAllByUserid(userId);
		if(orders.isEmpty()) {
			return ResponseEntity.ok().body(new MessageResponse("Nem található korábbi rendelés!"));
		}
		else {
			try {
				ObjectMapper mapper = config.getJacksonObjectMapper();
				return ResponseEntity.ok().body(new MessageResponse(mapper.writeValueAsString(orders)));
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
			}
			
		}
		
		
	}
	
	/**
	 * Rendeléshez tartozó termékek lekérése
	 * Minden felhasználó csak a saját rendeléseihez tartozó adatokat látja
	 * @param orderId A keresett rendelés azonosítója
	 * @return MessageResponse String adattaggal, a rendeléshez tartozó termékek JSON formátumban, vagy hibaüzenet
	 */
	@GetMapping("getOrderProducts")
	public ResponseEntity<?> getOrderProducts(long orderId) {
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = userDetails.getId();
		if(ordersRepo.findById(orderId).isEmpty()) {
			return ResponseEntity.status(404).body(new MessageResponse("Nem található rendelés ezzel az azonosítóval!"));
		}
		if(ordersRepo.findById(orderId).get().getUser_id() != userId) {
			return ResponseEntity.status(403).body(new MessageResponse("A felhasználónak nincs jogosultsága megtekinteni ezt a rendelést!"));
		}else {
			List<OrderProducts> op = orderProductsRepo.findAllByOrderid(orderId);
			try {
			ObjectMapper mapper = new ObjectMapper();
			return ResponseEntity.ok(new MessageResponse(mapper.writeValueAsString(op)));
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
			}
		}
	}
	
	/**
	 * Jelszó változtatás, felhasználó kijelentkeztetése ha sikeres
	 * Új jelszó min. 6 karakter
	 * @param oldPwd String, régi jelszó
	 * @param newPwd String, új jelszó
	 * @return A változtatás eredménye
	 */
	@PostMapping("changePassword")
	public ResponseEntity<?> getOrderProducts(String oldPwd, String newPwd) {
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Long userId = userDetails.getId();
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDetails.getUsername(), oldPwd));
			if(authentication.isAuthenticated()) {}
			if(newPwd == null || newPwd.isEmpty() || newPwd.isBlank() || newPwd.length() < 6) {
				return ResponseEntity.ok().body("Az új jelszó nem megfelelő!");
			} else {
				User u = userRepo.findById(userId).get();
				u.setPassword(encoder.encode(newPwd));
				userRepo.save(u);
				HttpHeaders headers = new HttpHeaders();
				ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
				headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
				headers.add("Location", "http://localhost:3000");
			    return ResponseEntity.ok().headers(headers).body("Jelszó sikeresen megváltoztatva!");
			}
		}catch(Exception ex) {
			return ResponseEntity.ok().body("A régi jelszó nem megfelelő!");
		}
	}
}
