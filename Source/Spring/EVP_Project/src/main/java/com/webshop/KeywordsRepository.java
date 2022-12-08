package com.webshop;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * keywords adatbázis táblához tartozó repo
 * @author BalazsPC
 *
 */
public interface KeywordsRepository extends JpaRepository<Keywords, KeywordsId> {

}
