package com.webshop;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * orders adatbázis táblát leíró JPA modell
 * @author BalazsPC
 *
 */
@Entity
@Table(name="orders")
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="user_id")
	private long userid;
	private LocalDateTime order_date;
	private byte order_state;
	private short payment_method;
	private byte payment_state;
	private String phone;
	private String country;
	private String country_1;
	private String city;
	private short post_code;
	private String street;
	private String house_number;
	private String post_other;
	public byte getOrder_state() {
		return order_state;
	}
	public void setOrder_state(byte order_state) {
		this.order_state = order_state;
	}
	public byte getPayment_state() {
		return payment_state;
	}
	public void setPayment_state(byte payment_state) {
		this.payment_state = payment_state;
	}
	public long getId() {
		return id;
	}
	public long getUser_id() {
		return userid;
	}
	public LocalDateTime getOrder_date() {
		return order_date;
	}
	public short getPayment_method() {
		return payment_method;
	}
	public String getPhone() {
		return phone;
	}
	public String getCountry() {
		return country;
	}
	public String getCountry_1() {
		return country_1;
	}
	public String getCity() {
		return city;
	}
	public short getPost_code() {
		return post_code;
	}
	public String getStreet() {
		return street;
	}
	public String getHouse_number() {
		return house_number;
	}
	public String getPost_other() {
		return post_other;
	}
	public void setId(long id) {
		this.id = id;
	}
	public void setUser_id(long user_id) {
		this.userid = user_id;
	}
	public void setOrder_date(LocalDateTime order_date) {
		this.order_date = order_date;
	}
	public void setPayment_method(short paymentMethod) {
		this.payment_method = paymentMethod;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public void setCountry_1(String country_1) {
		this.country_1 = country_1;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public void setPost_code(short post_code) {
		this.post_code = post_code;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public void setHouse_number(String house_number) {
		this.house_number = house_number;
	}
	public void setPost_other(String post_other) {
		this.post_other = post_other;
	}
	
}
