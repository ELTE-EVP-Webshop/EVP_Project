package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * product_images adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductImagesRepository extends JpaRepository<ProductImages, ProductImagesId> {
	List<ProductImages> findAllByProductid(long productid);
	
}
