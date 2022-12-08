package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * product_variations táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductVariationsRepository extends JpaRepository<ProductVariations, ProductVariationsId> {
	List<ProductVariations> findAllByProductid(long productid);
}
