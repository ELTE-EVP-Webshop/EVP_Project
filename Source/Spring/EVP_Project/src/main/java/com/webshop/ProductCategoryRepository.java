package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, ProductCategoryId> {
	List<ProductCategory> findAllByProductid(long productid);
}
