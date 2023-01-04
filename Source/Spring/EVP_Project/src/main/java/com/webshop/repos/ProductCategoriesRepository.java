package com.webshop.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webshop.dbModels.ProductCategories;

/**
 * categories adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductCategoriesRepository extends JpaRepository<ProductCategories, Long> {
	
}
