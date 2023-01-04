package com.webshop.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webshop.dbModels.Orders;

/**
 * Orders adatbázis tábla repoja
 * @author BalazsPC
 *
 */
public interface OrdersRepository extends JpaRepository<Orders, Long> {
	List<Orders> findAllByUserid(long userid);
}
