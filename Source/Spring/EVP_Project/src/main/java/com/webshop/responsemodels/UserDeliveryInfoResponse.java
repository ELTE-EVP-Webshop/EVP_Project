package com.webshop.responsemodels;

import com.webshop.User;

public class UserDeliveryInfoResponse {
	private String phone;
	private String country;
	private String country_l;
	private String city;
	private int post_code;
	private String street;
	private String house_number;
	private String post_other;
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
	public String getCountry_l() {
		return country_l;
	}
	public void setCountry_l(String country_l) {
		this.country_l = country_l;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public int getPost_code() {
		return post_code;
	}
	public void setPost_code(short post_code) {
		this.post_code = post_code;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getHouse_number() {
		return house_number;
	}
	public void setHouse_number(String house_number) {
		this.house_number = house_number;
	}
	public String getPost_other() {
		return post_other;
	}
	public void setPost_other(String post_other) {
		this.post_other = post_other;
	}
	public UserDeliveryInfoResponse(String phone, String country, String country_l, String city, short post_code, String street, String house_number, String post_other) {
		this.phone = phone;
		this.country = country;
		this.country_l = country_l;
		this.city = city;
		this.post_code = post_code;
		this.street = street;
		this.house_number = house_number;
		this.post_other = post_other;
	}
	
	public UserDeliveryInfoResponse() {};
	
	public UserDeliveryInfoResponse(User u) {
		this.phone = u.getPhone();
		this.country = u.getCountry();
		this.country_l = u.getCountry_1();
		this.city = u.getCity();
		this.post_code = u.getPostCode();
		this.street = u.getStreet();
		this.house_number = u.getHouseNumber();
		this.post_other = u.getPostOther();
	};
	
	
}
