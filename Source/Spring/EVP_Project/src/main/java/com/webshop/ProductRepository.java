package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * product adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	@Query(value = "SELECT * FROM product INNER JOIN product_category ON product.id = product_category.product_id WHERE product_category.category_id = :category_id", nativeQuery = true) 
	List<Product> findProductsByCategoryId(@Param("category_id") int category_id);
	
	@Query(value = "SELECT * FROM product INNER JOIN product_variations ON product.id = product_variations.product_id WHERE product_variations.variation_id = :variation_id", nativeQuery = true) 
	List<Product> findProductsByVariationId(@Param("variation_id") int variation_id);
	
	@Query(value = "SELECT * FROM product WHERE product.name LIKE %?1% OR product.description LIKE %?1%", nativeQuery = true) 
	List<Product> findProductsByFilterText(String filterText);
	
	@Query(value = "SELECT * FROM product INNER JOIN keywords ON keywords.product_id = product.id WHERE keywords.keyword LIKE ?1", nativeQuery = true) 
	List<Product> findProductsByKeyword(String keyword);
	
}
