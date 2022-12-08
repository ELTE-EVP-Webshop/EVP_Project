package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * product_category adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, ProductCategoryId> {
	List<ProductCategory> findAllByProductid(long productid);
}
