package com.webshop;

import javax.persistence.Column;
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
	@Column(name="product_id")
	private long productid;
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
	public long getProductid() {
		return productid;
	}
	public void setVariation_id(long variation_id) {
		this.variation_id = variation_id;
	}
	public void setProductid(long productid) {
		this.productid = productid;
	}
}
