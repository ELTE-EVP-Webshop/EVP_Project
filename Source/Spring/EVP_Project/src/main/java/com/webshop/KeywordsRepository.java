package com.webshop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * keywords adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface KeywordsRepository extends JpaRepository<Keywords, KeywordsId> {
	@Query(value = "SELECT EXISTS(SELECT * FROM keywords WHERE keyword = ?2 AND product_id = ?1)", nativeQuery = true) 
	public int hasKeyword(long productId, String keyword);
}
