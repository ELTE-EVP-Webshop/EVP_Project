package com.webshop.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.webshop.dbModels.ProductCategory;
import com.webshop.idModels.ProductCategoryId;

/**
 * product_category adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, ProductCategoryId> {
	List<ProductCategory> findAllByProductid(long productid);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM product_category WHERE product_id = ?1", nativeQuery = true) 
	int deleteAllProductCategoryById(long product_id);
}
