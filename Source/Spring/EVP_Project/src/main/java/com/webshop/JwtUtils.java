package com.webshop;

import java.util.Date;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import io.jsonwebtoken.*;

/**
 * JWT token generálást leíró osztály 
 * @author BalazsPC
 *
 */
@Component
public class JwtUtils {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  @Value("${webshop.app.jwtSecret}")
  private String jwtSecret;

  @Value("${webshop.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  @Value("${webshop.app.jwtCookieName}")
  private String jwtCookie;

  /**
   * JWT token kikeresése a sütikből
   * @param request HttpServletRequest, kliens szerver felé intézett kérése
   * @return String, a JWT token süti értéke
   */
  public String getJwtFromCookies(HttpServletRequest request) {
    Cookie cookie = WebUtils.getCookie(request, jwtCookie);
    if (cookie != null) {
      return cookie.getValue();
    } else {
      return null;
    }
  }

  /**
   * JWT süti generálása
   * @param userPrincipal UserDetailsImpl, ezen osztály adatai nyerhetők ki a tokenből, ezek alapján állítjuk elő
   * @return ResponseCookie, a tokent tartalmazó süti
   */
  public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal) {
    String jwt = generateTokenFromUsername(userPrincipal.getUsername());
    ResponseCookie cookie = ResponseCookie.from(jwtCookie, jwt).path("/").maxAge(24 * 60 * 60).httpOnly(true).sameSite("None").secure(true).build();
    return cookie;
  }

  /**
   * JWT süti törlése
   * @return ResponseCookie, "tiszta", érték nélküli token süti
   */
  public ResponseCookie getCleanJwtCookie() {
    ResponseCookie cookie = ResponseCookie.from(jwtCookie, null).path("/").build();
    return cookie;
  }

  /**
   * Felhasználónév keresés JWT tokenből
   * @param token String, a token, amiből ki szeretnénk nyerni az adatot
   * @return String, kinyert adat, felhasználónév
   */
  public String getUserNameFromJwtToken(String token) {
    return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
  }

  /**
   * JWT token érvényességének ellenőrzése
   * @param authToken String, validálni kívánt token
   * @return boolean, érvényes, vagy nem érvényes
   */
  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
      return true;
    } catch (SignatureException e) {
      logger.error("Invalid JWT signature: {}", e.getMessage());
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }
  
  /**
   * Token generálása a felhasználónévből
   * @param username String, a felhasználónév amiből tokent generálunk
   * @return String, generált token
   */
  public String generateTokenFromUsername(String username) {
    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
        .signWith(SignatureAlgorithm.HS512, jwtSecret)
        .compact();
  }
}