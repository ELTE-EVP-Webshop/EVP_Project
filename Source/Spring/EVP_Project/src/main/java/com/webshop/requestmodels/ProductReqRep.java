package com.webshop.requestmodels;

import java.util.List;

/**
 * Termék hozzáadásához, listázásához készült modell (admin)
 * String name, String description, int price, int salePrice, int stock, boolean visible, {@literal List<int>} categories, String images, {@literal List<String>} keywords, {@literal List<VariationReqRepModel>} variations
 * @author BalazsPC
 *
 */
public class ProductReqRep {
	private String name;
	private String description;
	private int price;
	private int salePrice;
	private int stock;
	private boolean visible;
	private List<Integer> categories;
	private String images;
	private List<String> keywords;
	private List<variationReqRepModel> variations;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(int salePrice) {
		this.salePrice = salePrice;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}
	public boolean isVisible() {
		return visible;
	}
	public void setVisible(boolean visible) {
		this.visible = visible;
	}
	public List<Integer> getCategories() {
		return categories;
	}
	public void setCategories(List<Integer> categories) {
		this.categories = categories;
	}
	public String getImages() {
		return images;
	}
	public void setImages(String images) {
		this.images = images;
	}
	public List<String> getKeywords() {
		return keywords;
	}
	public void setKeywords(List<String> keywords) {
		this.keywords = keywords;
	}
	public List<variationReqRepModel> getVariations() {
		return variations;
	}
	public void setVariations(List<variationReqRepModel> variations) {
		this.variations = variations;
	}
	
}