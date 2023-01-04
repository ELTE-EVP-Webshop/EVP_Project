package com.webshop.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.webshop.dbModels.Variations;

/**
 * variations adatbázis tábla repo
 * @author BalazsPC
 *
 */
public interface VariationsRepository extends JpaRepository<Variations, Long> {

}
