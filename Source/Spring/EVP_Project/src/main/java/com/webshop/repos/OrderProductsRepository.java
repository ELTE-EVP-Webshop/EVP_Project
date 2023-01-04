package com.webshop.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webshop.dbModels.OrderProducts;
import com.webshop.idModels.OrderProductsId;

/**
 * order_products adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface OrderProductsRepository extends JpaRepository<OrderProducts, OrderProductsId> {
	List<OrderProducts> findAllByOrderid(long orderid);
}
