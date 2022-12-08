package com.webshop;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * order_products adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface OrderProductsRepository extends JpaRepository<OrderProducts, OrderProductsId> {

}
