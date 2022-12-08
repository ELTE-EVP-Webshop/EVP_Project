package com.webshop;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * product adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface ProductRepository extends JpaRepository<Product, Long> {

}
