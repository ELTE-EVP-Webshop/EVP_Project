package com.webshop;

import java.io.Serializable;
import java.util.Objects;

public class ProductImagesId implements Serializable {
	private long product_id;
	private String image_url;
	
	public ProductImagesId() {
		
	}
	
	public ProductImagesId(long product_id, String image_url) {
        this.product_id = product_id;
        this.image_url = image_url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductImagesId imagesId = (ProductImagesId) o;
        return (this.product_id == imagesId.product_id && this.image_url.equals(imagesId.image_url));
    }

    @Override
    public int hashCode() {
        return Objects.hash(product_id, image_url);
    }
}
