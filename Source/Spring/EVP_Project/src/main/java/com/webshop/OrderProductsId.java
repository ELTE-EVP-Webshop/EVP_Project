package com.webshop;

import java.io.Serializable;
import java.util.Objects;

/**
 * OrderProducts modellhez tartozó id osztály
 * @author BalazsPC
 *
 */
public class OrderProductsId implements Serializable {
	private long order_id;
	private long product_id;
	
	public OrderProductsId() {
		
	}
	
	public OrderProductsId(long order_id, long product_id) {
        this.order_id = order_id;
        this.product_id = product_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderProductsId ordId = (OrderProductsId) o;
        return (this.order_id == ordId.order_id && this.product_id == ordId.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order_id, product_id);
    }
}
