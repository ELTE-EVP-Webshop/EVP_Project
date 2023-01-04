package com.webshop.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.webshop.dbModels.Keywords;
import com.webshop.idModels.KeywordsId;

/**
 * keywords adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface KeywordsRepository extends JpaRepository<Keywords, KeywordsId> {
	@Query(value = "SELECT EXISTS(SELECT * FROM keywords WHERE keyword = ?2 AND product_id = ?1)", nativeQuery = true) 
	public int hasKeyword(long productId, String keyword);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM keywords WHERE product_id = ?1", nativeQuery = true) 
	int deleteAllKeywordByProductId(long product_id);
}
