package com.webshop;

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
	private long product_id;
	@Id
	private long category_id;
	public long getProduct_id() {
		return product_id;
	}
	public long getCategory_id() {
		return category_id;
	}
	
	
}
