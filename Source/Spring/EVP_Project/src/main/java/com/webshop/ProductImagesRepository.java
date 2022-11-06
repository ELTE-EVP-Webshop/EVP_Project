package com.webshop;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImagesRepository extends JpaRepository<ProductImages, ProductImagesId> {
	List<ProductImages> findAllByProductid(long productid);
	
}
