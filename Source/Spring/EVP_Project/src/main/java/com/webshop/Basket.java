package com.webshop;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(value = { "userid", "expire" })
@Entity
@IdClass(BasketId.class)
@Table(name="basket")
public class Basket {
	@Id
	@Column(name="user_id")
	private long userid;
	@Id
	private long product_id;
	private int count;
	private LocalDateTime expire;
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public LocalDateTime getExpire() {
		return expire;
	}
	public void setExpire(LocalDateTime expire) {
		this.expire = expire;
	}
	public long getuserid() {
		return userid;
	}
	public long getProduct_id() {
		return product_id;
	}
	public Basket(long userid, long product_id, int count) {
		this.userid = userid;
		this.product_id = product_id;
		this.count = count;
		this.expire = null;
	}
	public Basket() {
		
	}
}