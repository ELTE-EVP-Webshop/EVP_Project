package com.webshop;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.*;

@Entity
@Table(name="user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="username", nullable = false, unique = true, length = 255)
	private String username;
	
	@Column(name="password")
	private String password;
	@Column(name="email")
	private String email;
	@Column(name="gender")
	private int gender;
	@Column(name="phone")
	private String phone;
	@Column(name="country")
	private String country;
	@Column(name="country_1")
	private String country_1;
	@Column(name="city")
	private String city;
	@Column(name="post_code")
	private int postCode;
	@Column(name="street")
	private String street;
	@Column(name="house_number")
	private String houseNumber;
	@Column(name="post_other")
	private String postOther;
	@Column(name="mail_confirmed")
	private boolean mailConfirmed;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	public Long getId() {
		return id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getCountry_1() {
		return country_1;
	}
	public void setCountry_1(String country_1) {
		this.country_1 = country_1;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public int getPostCode() {
		return postCode;
	}
	public void setPostCode(int postCode) {
		this.postCode = postCode;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getHouseNumber() {
		return houseNumber;
	}
	public void setHouseNumber(String houseNumber) {
		this.houseNumber = houseNumber;
	}
	public String getPostOther() {
		return postOther;
	}
	public void setPostOther(String postOther) {
		this.postOther = postOther;
	}
	public boolean isMailConfirmed() {
		return mailConfirmed;
	}
	public void setMailConfirmed(boolean mailConfirmed) {
		this.mailConfirmed = mailConfirmed;
	}
}
