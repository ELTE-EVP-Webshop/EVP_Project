package com.webshop;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webshop.Model.EmailDetails;
import com.webshop.requestmodels.*;
import com.webshop.responsemodels.*;
import com.webshop.services.EmailService;
import com.webshop.services.tokenService;

/**
 * Auth controller
 * Autentikációs műveletek (Bejelentkezés, Regisztráció, Kijelentkezés).
 * Eléréséhez nem szükséges jogosultság / bejelentkezés 
 * @author BalazsPC
 *
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;
  
  @Autowired
  private TokensRepository tokensRepo;
  
  @Autowired 
  private EmailService emailService;
  
  @Autowired
  private tokenService tokenService;

  /**
   * Bejelentkezés
   * Felhasználó beléptetése, token generálása (id, felhasználónév, email, jogosultságok alapján)
   * @param loginRequest
   * @return ResponseEntity<?>, bejelentkezés eredmény, siker esetén token küldése sütikben, vagy sikertelen bejelentkezés oka. 
   */
  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).header("Access-Control-Allow-Methods", "GET, POST, OPTIONS").header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
        .body(new UserInfoResponse(userDetails.getId(),
                                   userDetails.getUsername(),
                                   userDetails.getEmail(),
                                   roles,
                                   jwtCookie.getValue().toString()));
  }

  /**
   * Regisztráció
   * Felhasnzáló regisztrálása a rendszerben. Felhasználónév / Email unique adattag, ellenőrzés, adatok eltárolása.
   * Megerősítő email kiküldése, szükséges token generálása.
   * @param signUpRequest SignUpReques, a regisztrációs adatok RequestBody-ból.
   * @return ResponseEntity<?> Regisztráció eredmény. Sikertelen regisztráció esetén a sikertelenség oka.
   */
  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
    }

    // Create new user's account
    User user = new User();
    user.setUsername(signUpRequest.getUsername());
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(encoder.encode(signUpRequest.getPassword()));
    user.setGender(signUpRequest.getGender());

    Set<String> strRoles = signUpRequest.getRole();
    Set<Role> roles = new HashSet<>();

    /*
     ROLE_CUSTOMER,
	 ROLE_SUPPLIER,
	 ROLE_VIPCUSTOMER,
	 ROLE_PARTNERCOMPANY,
	 ROLE_ADMIN1,
	 ROLE_ADMIN2
     */
    
    if (strRoles == null) {
      Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
        case "admin2":
          Role admin2Role = roleRepository.findByName(ERole.ROLE_ADMIN2)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(admin2Role);
          break;
          
        case "admin1":
          Role admin1Role = roleRepository.findByName(ERole.ROLE_ADMIN1)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(admin1Role);
          break;
          
        case "partnercompany":
            Role partnercompanyRole = roleRepository.findByName(ERole.ROLE_PARTNERCOMPANY)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(partnercompanyRole);
            break;
            
        case "vipcustomer":
            Role vipcustomerRole = roleRepository.findByName(ERole.ROLE_VIPCUSTOMER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(vipcustomerRole);
            break;
            
        case "supplier":
            Role supplierRole = roleRepository.findByName(ERole.ROLE_SUPPLIER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(supplierRole);
            break;
            
        default:
          Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
          roles.add(userRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);
    
    EmailDetails d = new EmailDetails();
    String token = tokenService.createStaticTypeTokenToken(user.getId().intValue(), (byte)1);
	String url = "<a href='http://localhost:8080/api/auth/confirmMail?userId="+user.getId()+"&tokenKey=" + token +"'>ide</a>";
    d.setSubject("IK Webshop - Sikeres regisztráció");
	d.setRecipient(user.getEmail());
	d.setMsgBody("<b>Kedves " + user.getUsername()+"!</b><br><br><p><label style='color:green'>Köszönjük</label>, hogy regisztrált az IK Webshopba. Az E-mail címe megerősítéséhez kérjük kattintson "+url+" </p><br><br>Üdvözlettel: <b>IK Webshop</b>");
	emailService.sendMailInHtmlFormat(d);
	
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

  
  /**
   * Kijelentkezés
   * @return ResponseEntity<?>, kijelentkezés eredménye
   */
  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(new MessageResponse("You've been signed out!"));
  }
  
  @GetMapping("askNewPasswordMail")
  public ResponseEntity<?> askNewPasswordMail(String email) {
	  Optional<User> u = userRepository.findByEmail(email);
	  if(!u.isEmpty()) {
		  String token = tokenService.createStaticTypeTokenToken(u.get().getId().intValue(), (byte)2);
		  String url = "<a href='http://localhost:3000/newPassword?userId="+u.get().getId()+"&token=" + token +"'>ide</a>";
		  EmailDetails d = new EmailDetails();
		  d.setSubject("IK Webshop - Elfelejtett jelszó");
		  d.setRecipient(email);
		  d.setMsgBody("<b>Kedves " + u.get().getUsername()+"!</b><br><br><p>Az új jelszavának megadásához kérjük kattintson "+url+" </p><br><br>Üdvözlettel: <b>IK Webshop</b>");
		  if(emailService.sendMailInHtmlFormat(d)) {
			  return ResponseEntity.ok().body("E-Mail elküldve!");
		  }else {
			  return ResponseEntity.ok().body("E-Mail küldése sikertelen!");
		  }
	  }else {
		  return ResponseEntity.ok().body("A keresett mail nem található!");
	  }
  }
  
  /**
   * Email cím megerősítése
   * @param userId long, a felhasználó id-je
   * @param tokenKey String, a generált token
   * @return Átirányítás a megfelelő oldalra(sikeres, sikertelen)
   */
  @GetMapping("confirmMail")
  public ResponseEntity<?> confirmMail(long userId, String tokenKey) {
	  HttpHeaders headers = new HttpHeaders();
	  Optional<Tokens> t = tokensRepo.findById(tokenKey);
	  Optional<User> u = userRepository.findById(userId);
	  if(!u.isEmpty() && !t.isEmpty()) {
		  if(t.get().getType() == 1 && t.get().getValue() == userId) {
			  u.get().setMailConfirmed(true);
			  userRepository.save(u.get());
			  tokensRepo.deleteStaticTypeTokenById(userId, (short)1);
			  headers.add("Location", "http://localhost:3000/mailConfirmSuccess");
		  }else {
			  headers.add("Location", "http://localhost:3000/mailConfirmFailed");
		  }
	  }else{
		  headers.add("Location", "http://localhost:3000/mailConfirmFailed");
	  }
	  
	  return new ResponseEntity<String>(headers,HttpStatus.FOUND);
  }
  
  /**
   * Elfelejtett jelszó helyett új jelszó megadása
   * @param userId long, Felhasználó azonosítója
   * @param tokenKey String, a generált token
   * @param newPassword String, az új jelszó. Hossza min. 6 karakter
   * @return a módosítás eredménye
   */
  @PostMapping("newPassword")
  public ResponseEntity<?> newPassword(long userId, String tokenKey, String newPassword) {
	  Optional<Tokens> t = tokensRepo.findById(tokenKey);
	  Optional<User> u = userRepository.findById(userId);
	  if(!u.isEmpty() && !t.isEmpty()) {
		  if(t.get().getType() == 2 && t.get().getValue() == userId) {
			  if(newPassword == null || newPassword.isEmpty() || newPassword.isBlank() || newPassword.length() < 6) {
				  return ResponseEntity.ok().body("Hibás új jelszó!");
			  }else {
				  u.get().setPassword(encoder.encode(newPassword));
				  userRepository.save(u.get());
				  tokensRepo.deleteStaticTypeTokenById(userId, (short)2);
				  return ResponseEntity.ok().body("Sikeres jelszó módosítás!");
			  }
		  }else {
			  return ResponseEntity.ok().body("Sikertelen módosítás!");
		  }
	  }else{
		  return ResponseEntity.ok().body("Sikertelen módosítás!");
	  }
  }
}