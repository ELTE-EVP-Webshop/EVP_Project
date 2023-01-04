package com.webshop.idModels;

import java.io.Serializable;
import java.util.Objects;

/**
 * OrderProducts modellhez tartozó id osztály
 * @author BalazsPC
 *
 */
@SuppressWarnings("serial")
public class OrderProductsId implements Serializable {
	private long orderid;
	private long product_id;
	
	public OrderProductsId() {
		
	}
	
	public OrderProductsId(long order_id, long product_id) {
        this.orderid = order_id;
        this.product_id = product_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderProductsId ordId = (OrderProductsId) o;
        return (this.orderid == ordId.orderid && this.product_id == ordId.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderid, product_id);
    }
}
