package com.webshop.requestmodels;

/**
 * ProductReqRep modellhez tárgycsoport modell
 * @author BalazsPC
 *
 */
public class variationReqRepModel {
	private int variation;
	private String description;
	public int getVariation() {
		return variation;
	}
	public void setVariation(int variation) {
		this.variation = variation;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
