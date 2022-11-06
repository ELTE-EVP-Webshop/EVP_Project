package com.webshop;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

//Adott termékre vonatkozó kategóriák
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
	
	
}
