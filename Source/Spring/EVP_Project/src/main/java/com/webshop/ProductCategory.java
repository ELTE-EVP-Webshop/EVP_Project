package com.webshop;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

//Adott termékre vonatkozó kategóriák
/**
 * product_category adatbázis táblát leíró JPA modell
 * @author BalazsPC
 *
 */
@Entity
@IdClass(ProductCategoryId.class)
@Table(name="product_category")
public class ProductCategory {
	@Id
	@Column(name="product_id")
	private long productid;
	@Id
	private long category_id;
	public long getProductid() {
		return productid;
	}
	public long getCategory_id() {
		return category_id;
	}
	public void setProductid(long productid) {
		this.productid = productid;
	}
	public void setCategory_id(long category_id) {
		this.category_id = category_id;
	}
	
	
}
