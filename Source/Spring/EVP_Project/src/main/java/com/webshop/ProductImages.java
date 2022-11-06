package com.webshop;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(ProductImagesId.class)
@Table(name="product_images")
public class ProductImages {
	@Id
	@Column(name = "product_id")
	private long productid;
	@Id
	private String image_url;
	private byte priority;
	public byte getPriority() {
		return priority;
	}
	public void setPriority(byte priority) {
		this.priority = priority;
	}
	public long getProductid() {
		return productid;
	}
	public String getImage_url() {
		return image_url;
	}
	
	
}
