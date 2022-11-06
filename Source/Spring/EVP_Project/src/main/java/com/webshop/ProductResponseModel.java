package com.webshop;

import java.util.List;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProductResponseModel  {
	private Product p;
	private List<ProductImages> Images;
	private List<ProductVariations> variations;
	private List<ProductCategory> Categories;
	public void setP(Product p) {
		this.p = p;
	}
	public void setImages(List<ProductImages> images) {
		Images = images;
	}
	public void setVariations(List<ProductVariations> variations) {
		this.variations = variations;
	}
	public void setCategories(List<ProductCategory> categories) {
		Categories = categories;
	}
	public ProductResponseModel(Product p) {
		super();
		this.p = p;
	}
	public ProductResponseModel() {
		super();
	}
	public Product getP() {
		return p;
	}
	public List<ProductImages> getImages() {
		return Images;
	}
	public List<ProductVariations> getVariations() {
		return variations;
	}
	public List<ProductCategory> getCategories() {
		return Categories;
	}
}
