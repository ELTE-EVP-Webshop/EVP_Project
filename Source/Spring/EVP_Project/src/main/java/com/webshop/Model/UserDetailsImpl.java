package com.webshop.Model;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.webshop.dbModels.User;

/**
 * UserDetails osztály implementációja, célja, hogy meghatározzuk milyen adatokból generáljuk a tokent, és miket nyerjünk ki belőle
 * @author BalazsPC
 *
 */
public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String username;

  private String email;

  @JsonIgnore
  private String password;

  private Collection<? extends GrantedAuthority> authorities;

  /**
   * Konstruktor, egyesével megadott adatokhoz
   * @param id long, a felhasználó egyedi azonosítója
   * @param username String, felhasználónév (unique)
   * @param email String, a fiókhoz tartozó email (unique)
   * @param password String, a felhasználó jelszava
   * @param authorities {@literal Collection<? extends GrantedAuthority> }, Gyűjtemény, a felhasználó jogosultságai
   */
  public UserDetailsImpl(Long id, String username, String email, String password,
      Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  /**
   * Statikus konstruktor User modellből történő használathoz
   * @param user User modell, a felhasználó
   * @return UserDetailsImpl, a generált típus
   */
  public static UserDetailsImpl build(User user) {
    List<GrantedAuthority> authorities = user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

    return new UserDetailsImpl(
        user.getId(), 
        user.getUsername(), 
        user.getEmail(),
        user.getPassword(), 
        authorities);
  }

  /**
   * Getter a felhasználó jogosultságaihoz
   * @return authorities {@literal Collection<? extends GrantedAuthority> }, a felhasználó jogosultságai
   */
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  public Long getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return username;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  /**
   * Felülírt metódus, két object összehasonlítása
   * @return boolean, az objectek egyeznek, vagy nem
   */
  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  }
}