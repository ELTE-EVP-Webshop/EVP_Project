package com.webshop;

import java.io.Serializable;
import java.util.Objects;

/**
 * ProductImages adatbázis modellhez tartozó id osztály
 * @author BalazsPC
 *
 */
public class ProductImagesId implements Serializable {
	private long productid;
	private String image_url;
	
	public ProductImagesId() {
		
	}
	
	public ProductImagesId(long productid) {
		this.productid = productid;
	}
	
	public ProductImagesId(long productid, String image_url) {
        this.productid = productid;
        this.image_url = image_url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductImagesId imagesId = (ProductImagesId) o;
        return (this.productid == imagesId.productid && this.image_url.equals(imagesId.image_url));
    }

    @Override
    public int hashCode() {
        return Objects.hash(productid, image_url);
    }
}
