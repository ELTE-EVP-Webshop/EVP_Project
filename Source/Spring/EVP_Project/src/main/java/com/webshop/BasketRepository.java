package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * baket adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface BasketRepository extends JpaRepository<Basket, BasketId> {
	List<Basket> findAllByUserid(long userid);
	void deleteAllByUserid(long userid);
}
