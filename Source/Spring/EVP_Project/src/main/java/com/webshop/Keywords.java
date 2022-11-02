package com.webshop;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(KeywordsId.class)
@Table(name="keywords")
public class Keywords {
	@Id
	private long product_id;
	@Id
	private String keyword;
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public long getProduct_id() {
		return product_id;
	}
	
	
}