package com.webshop;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webshop.requestmodels.*;
import com.webshop.responsemodels.*;

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
}