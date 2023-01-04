package com.webshop.dbModels;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.webshop.idModels.ProductImagesId;

/**
 * product_images adatbázis táblát leíró JPA modell
 * @author BalazsPC
 *
 */
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
	public void setProductid(long productid) {
		this.productid = productid;
	}
	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}
}