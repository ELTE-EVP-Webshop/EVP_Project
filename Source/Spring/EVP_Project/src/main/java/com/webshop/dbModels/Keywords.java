package com.webshop.dbModels;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.webshop.idModels.KeywordsId;

/**
 * keywords adatbázis táblát leíró JPA modell
 * @author BalazsPC
 *
 */
@Entity
@IdClass(KeywordsId.class)
@Table(name="keywords")
public class Keywords {
	@Id
	private long product_id;
	public void setProduct_id(long product_id) {
		this.product_id = product_id;
	}
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
