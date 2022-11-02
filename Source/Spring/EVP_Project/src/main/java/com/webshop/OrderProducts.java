package com.webshop;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(OrderProductsId.class)
@Table(name="order_products")
public class OrderProducts {
	@Id
	private long order_id;
	@Id
	private long product_id;
	private int count;
	private int price;
	private int sale_price;
	
	public long getOrder_id() {
		return order_id;
	}
	public long getProduct_id() {
		return product_id;
	}
	public int getCount() {
		return count;
	}
	public int getPrice() {
		return price;
	}
	public int getSale_price() {
		return sale_price;
	}
	
}
