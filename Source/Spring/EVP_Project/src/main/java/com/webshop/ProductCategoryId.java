package com.webshop;

import java.io.Serializable;
import java.util.Objects;

public class ProductCategoryId implements Serializable {
	private long productid;
	private long category_id;
	
	public ProductCategoryId() {
		
	}
	
	public ProductCategoryId(long category_id, long productid) {
        this.category_id = category_id;
        this.productid = productid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductCategoryId categoryId = (ProductCategoryId) o;
        return (this.category_id == categoryId.category_id && this.productid == categoryId.productid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(category_id, productid);
    }
}
