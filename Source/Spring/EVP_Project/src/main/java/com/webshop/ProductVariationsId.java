package com.webshop;

import java.io.Serializable;
import java.util.Objects;

public class ProductVariationsId implements Serializable {
	private long variation_id;
	private long product_id;
	
	public ProductVariationsId() {
		
	}
	
	public ProductVariationsId(long variation_id, long product_id) {
        this.variation_id = variation_id;
        this.product_id = product_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductVariationsId variationId = (ProductVariationsId) o;
        return (this.variation_id == variationId.variation_id && this.product_id == variationId.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(variation_id, product_id);
    }
}
