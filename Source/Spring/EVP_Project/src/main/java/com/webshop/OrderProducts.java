package com.webshop;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

/**
 * order_products adatbázis táblát leíró JPA modell
 * @author BalazsPC
 *
 */
@Entity
@IdClass(OrderProductsId.class)
@Table(name="order_products")
public class OrderProducts {
	@Id
	@Column(name="order_id")
	private long orderid;
	@Id
	private long product_id;
	private int count;
	private int price;
	private int sale_price;
	
	public long getOrder_id() {
		return orderid;
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
	public void setOrder_id(long order_id) {
		this.orderid = order_id;
	}
	public void setProduct_id(long product_id) {
		this.product_id = product_id;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public void setSale_price(int sale_price) {
		this.sale_price = sale_price;
	}
	
	
	
}
