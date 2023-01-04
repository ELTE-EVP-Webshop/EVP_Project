package com.webshop.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.webshop.dbModels.Basket;
import com.webshop.idModels.BasketId;

/**
 * baket adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface BasketRepository extends JpaRepository<Basket, BasketId> {
	List<Basket> findAllByUserid(long userid);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM basket WHERE user_id = ?1", nativeQuery = true) 
	int clearBasketById(long userid);
}
