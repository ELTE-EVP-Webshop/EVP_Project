package com.webshop;

import java.io.Serializable;
import java.util.Objects;

/**
 * ProductVariations modellhez tartozó id osztály
 * @author BalazsPC
 *
 */
public class ProductVariationsId implements Serializable {
	private long variation_id;
	private long productid;
	
	public ProductVariationsId() {
		
	}
	
	public ProductVariationsId(long variation_id, long productid) {
        this.variation_id = variation_id;
        this.productid = productid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductVariationsId variationId = (ProductVariationsId) o;
        return (this.variation_id == variationId.variation_id && this.productid == variationId.productid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(variation_id, productid);
    }
}
