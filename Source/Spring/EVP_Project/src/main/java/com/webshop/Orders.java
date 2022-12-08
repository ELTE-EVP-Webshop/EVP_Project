package com.webshop;

import java.time.LocalDateTime;

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
	private long user_id;
	private LocalDateTime order_date;
	private byte order_state;
	private byte payment_method;
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
		return user_id;
	}
	public LocalDateTime getOrder_date() {
		return order_date;
	}
	public byte getPayment_method() {
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
	
	
}
