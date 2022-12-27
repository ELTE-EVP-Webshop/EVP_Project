package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

/**
 * product_images adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductImagesRepository extends JpaRepository<ProductImages, ProductImagesId> {
	List<ProductImages> findAllByProductid(long productid);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM product_images WHERE product_id = ?1", nativeQuery = true) 
	int deleteProductImagesByProductId(long product_id);
}
