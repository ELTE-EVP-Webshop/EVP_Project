package com.webshop;

import java.io.Serializable;
import java.util.Objects;

public class ProductCategoryId implements Serializable {
	private long product_id;
	private long category_id;
	
	public ProductCategoryId() {
		
	}
	
	public ProductCategoryId(long category_id, long product_id) {
        this.category_id = category_id;
        this.product_id = product_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductCategoryId categoryId = (ProductCategoryId) o;
        return (this.category_id == categoryId.category_id && this.product_id == categoryId.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(category_id, product_id);
    }
}
