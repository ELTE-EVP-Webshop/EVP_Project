package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Orders adatbázis tábla repoja
 * @author BalazsPC
 *
 */
public interface OrdersRepository extends JpaRepository<Orders, Long> {
	List<Orders> findAllByUserid(long userid);
}
