package com.webshop;

import java.io.Serializable;
import java.util.Objects;

public class BasketId implements Serializable {
	private long user_id;
	private long product_id;
	
	public BasketId() {
		
	}
	
	public BasketId(long user_id, long product_id) {
        this.user_id = user_id;
        this.product_id = product_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BasketId basketId = (BasketId) o;
        return (this.user_id == basketId.user_id && this.product_id == basketId.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, product_id);
    }
}
