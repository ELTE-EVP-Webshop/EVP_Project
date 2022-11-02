package com.webshop;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(ProductVariationsId.class)
@Table(name="product_variations")
public class ProductVariations {
	@Id
	private long variation_id;
	@Id
	private long product_id;
	private String small_desc;
	public String getSmall_desc() {
		return small_desc;
	}
	public void setSmall_desc(String small_desc) {
		this.small_desc = small_desc;
	}
	public long getVariation_id() {
		return variation_id;
	}
	public long getProduct_id() {
		return product_id;
	}
	
}
