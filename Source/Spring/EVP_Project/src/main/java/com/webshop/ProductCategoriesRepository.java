package com.webshop;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * categories adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductCategoriesRepository extends JpaRepository<ProductCategories, Long> {

}
