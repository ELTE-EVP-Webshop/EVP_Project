package com.webshop;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(ProductImagesId.class)
@Table(name="product_images")
public class ProductImages {
	@Id
	private long product_id;
	@Id
	private String image_url;
	private byte priority;
	public byte getPriority() {
		return priority;
	}
	public void setPriority(byte priority) {
		this.priority = priority;
	}
	public long getProduct_id() {
		return product_id;
	}
	public String getImage_url() {
		return image_url;
	}
	
	
}
