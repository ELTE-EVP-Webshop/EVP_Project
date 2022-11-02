package com.webshop;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(BasketId.class)
@Table(name="basket")
public class Basket {
	@Id
	private long user_id;
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
	public long getUser_id() {
		return user_id;
	}
	public long getProduct_id() {
		return product_id;
	}
}