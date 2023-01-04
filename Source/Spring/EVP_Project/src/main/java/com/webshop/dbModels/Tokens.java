package com.webshop.dbModels;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * tokens adatbázis táblához tartozó JPA modell
 * @author BalazsPC
 *
 */
@Entity
@Table(name="tokens")
public class Tokens {
	@Id
	private String token;
	private byte type;
	private int value;
	private int remaining;
	private LocalDateTime expire;
	private String description;
	public byte getType() {
		return type;
	}
	public void setType(byte type) {
		this.type = type;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public int getRemaining() {
		return remaining;
	}
	public void setRemaining(int remaining) {
		this.remaining = remaining;
	}
	public LocalDateTime getExpire() {
		return expire;
	}
	public void setExpire(LocalDateTime expire) {
		this.expire = expire;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
}
