package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

/**
 * product_variations táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductVariationsRepository extends JpaRepository<ProductVariations, ProductVariationsId> {
	List<ProductVariations> findAllByProductid(long productid);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM product_variations WHERE product_id = ?1", nativeQuery = true) 
	int deleteProductFromAllVariation(long product_id);
}
