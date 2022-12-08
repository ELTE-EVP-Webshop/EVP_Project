package com.webshop;

import java.io.Serializable;
import java.util.Objects;

/**
 * Basket modellhez tartozó ID osztály
 * @author BalazsPC
 *
 */
public class BasketId implements Serializable {
	private long userid;
	private long product_id;
	
	public BasketId() {
		
	}
	
	public BasketId(long userid, long product_id) {
        this.userid = userid;
        this.product_id = product_id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BasketId basketId = (BasketId) o;
        return (this.userid == basketId.userid && this.product_id == basketId.product_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userid, product_id);
    }
}
